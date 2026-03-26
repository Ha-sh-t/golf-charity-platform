import React, { useEffect, useState } from "react";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState("");
  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState("");
  const [drawResult, setDrawResult] = useState(null);

  const navigate = useNavigate();

  // ---------------- API CALLS ----------------
  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setScores(res.data.scores || []);
      setSelectedCharity(res.data.charity || "");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCharities = async () => {
    try {
      const res = await API.get("/charity");
      setCharities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddScore = async () => {
    if (newScore < 1 || newScore > 45) {
      alert("Score must be between 1 and 45");
      return;
    }

    try {
      const res = await API.post("/scores", {
        value: Number(newScore),
      });
      setScores(res.data);
      setNewScore("");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (index) => {
    try {
      const res = await API.delete(`/scores/${index}`);
      setScores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCharity = async () => {
    try {
      await API.post("/charity/select", {
        charity: selectedCharity,
      });
      alert("Charity Updated!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDraw = async () => {
    try {
      const res = await API.get("/draw/run");
      setDrawResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- AUTH CHECK ----------------
  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/");
        return;
    }

    fetchProfile();
    fetchCharities();
}, [navigate]);

  // ---------------- UI ----------------
  return (
    <div style={pageContainer}>
      <div style={blob1}></div>
      <div style={blob2}></div>

      {/* NAV */}
      <nav style={navStyle}>
        <div style={logoStyle}>
          IMPACT<span>HUB</span>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          style={logoutBtn}
        >
          Sign Out
        </button>
      </nav>

      <main style={contentWrapper}>
        {/* HEADER */}
        <header style={headerStyle}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={titleStyle}
          >
            Performance for Purpose
          </motion.h1>

          <p style={subtitleStyle}>
            Your focus:{" "}
            <span style={highlightText}>
              {selectedCharity || "Choose a mission"}
            </span>
          </p>
        </header>

        {/* MAIN GRID */}
        <div style={gridStyle}>
          {/* SUBSCRIPTION */}
          <div style={glassCard}>
            <h3 style={cardLabel}>Subscription</h3>
            <p>
              Status: <b style={{ color: "#34d399" }}>Active</b>
            </p>
            <p>
              Renewal: <b>{new Date().toLocaleDateString()}</b>
            </p>
          </div>

          {/* SCORES */}
          <motion.div style={glassCard}>
            <h3 style={cardLabel}>Performance Log</h3>

            <div style={scorePillContainer}>
              {scores.length === 0 ? (
                <p style={emptyText}>No entries yet</p>
              ) : (
                scores.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div style={scorePill}>{s.value}</div>

                    <button
                      onClick={() => handleDelete(i)}
                      style={deleteBtn}
                    >
                      ❌
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={inputGroup}>
              <input
                type="number"
                placeholder="1-45"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                style={modernInput}
              />

              <button
                disabled={!newScore || newScore < 1 || newScore > 45}
                onClick={handleAddScore}
                style={
                  newScore >= 1 && newScore <= 45
                    ? actionButton
                    : disabledButton
                }
              >
                Add
              </button>
            </div>
          </motion.div>

          {/* CHARITY */}
          <motion.div style={glassCard}>
            <h3 style={cardLabel}>Direct Your Impact</h3>

            <select
              value={selectedCharity}
              onChange={(e) => setSelectedCharity(e.target.value)}
              style={modernSelect}
            >
              <option value="">Select Charity</option>
              {charities.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              disabled={!selectedCharity}
              onClick={handleCharity}
              style={{ ...secondaryButton, marginTop: "10px" }}
            >
              Save
            </button>
          </motion.div>

          {/* PARTICIPATION */}
          <div style={glassCard}>
            <h3 style={cardLabel}>Participation</h3>
            <p>
              Draws Entered: <b>{scores.length}</b>
            </p>
            <p>
              Upcoming Draw: <b>This Month</b>
            </p>
          </div>
        </div>

        {/* DRAW SECTION */}
        <div style={drawSection}>
          <button
            onClick={handleDraw}
            disabled={scores.length === 0}
            style={
              scores.length === 0 ? disabledButton : bigDrawButton
            }
          >
            ✨ Run Draw
          </button>

          <AnimatePresence>
            {drawResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={resultBox}
              >
                <p>
                  <b>Draw:</b> {drawResult.drawNumbers.join(", ")}
                </p>
                <p>
                  <b>Matches:</b>{" "}
                  {drawResult.matches.length > 0
                    ? drawResult.matches.join(", ")
                    : "None"}
                </p>
                <p>
                  <b>Match Count:</b> {drawResult.matchCount}
                </p>

                {drawResult.matchCount >= 3 && (
                  <p style={winnerBadge}>🎉 You Won!</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const pageContainer = { background: "#0f172a", minHeight: "100vh", color: "white" };

const navStyle = { display: "flex", justifyContent: "space-between", padding: "20px" };

const logoStyle = { fontWeight: "bold" };

const logoutBtn = { padding: "8px", background: "#dc3545", color: "white", border: "none" };

const contentWrapper = { maxWidth: "1000px", margin: "auto", padding: "20px" };

const headerStyle = { textAlign: "center", marginBottom: "30px" };

const titleStyle = { fontSize: "2rem" };

const subtitleStyle = { color: "#aaa" };

const highlightText = { color: "#34d399" };

const gridStyle = { display: "grid", gap: "20px" };

const glassCard = { padding: "20px", border: "1px solid #333", borderRadius: "10px" };

const cardLabel = { marginBottom: "10px" };

const scorePillContainer = { display: "flex", flexWrap: "wrap", gap: "10px" };

const scorePill = { background: "#222", padding: "8px 12px", borderRadius: "8px" };

const deleteBtn = { background: "none", border: "none", color: "red", cursor: "pointer" };

const inputGroup = { display: "flex", gap: "10px", marginTop: "10px" };

const modernInput = { padding: "10px" };

const modernSelect = { padding: "10px", width: "100%" };

const actionButton = { background: "#6366f1", color: "white", border: "none", padding: "10px" };

const secondaryButton = { background: "#444", color: "white", border: "none", padding: "10px" };

const disabledButton = { background: "#333", color: "#777", padding: "10px" };

const drawSection = { textAlign: "center", marginTop: "30px" };

const bigDrawButton = { padding: "15px 30px", fontSize: "16px" };

const resultBox = { marginTop: "20px", padding: "20px", border: "1px solid #333" };

const winnerBadge = { color: "green", fontWeight: "bold" };

const emptyText = { opacity: 0.5 };

const blob1 = {};
const blob2 = {};
