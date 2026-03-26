import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageContainer}>
      {/* Visual consistency with Login page blobs */}
      <div style={blob1}></div>
      <div style={blob2}></div>

      <div style={glassCard}>
        <div style={headerSection}>
          <h2 style={titleStyle}>Join the Mission</h2>
          <p style={subtitleStyle}>Create an account to start making an impact.</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputWrapper}>
            <label style={labelStyle}>Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              style={modernInput}
              required
            />
          </div>

          <div style={inputWrapper}>
            <label style={labelStyle}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              onChange={handleChange}
              style={modernInput}
              required
            />
          </div>

          <div style={inputWrapper}>
            <label style={labelStyle}>Create Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              style={modernInput}
              required
            />
          </div>

          <button 
            type="submit" 
            style={loading ? disabledBtn : registerBtn}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Get Started"}
          </button>
        </form>

        <div style={footerStyle}>
          <p>Already a member? <Link to="/" style={linkStyle}>Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

// --- Platform Consistent Styles ---

const pageContainer = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#0f172a", // Consistent deep slate
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  position: "relative",
  overflow: "hidden"
};

const glassCard = {
  width: "100%",
  maxWidth: "420px",
  padding: "40px",
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(12px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  zIndex: 10
};

const headerSection = { textAlign: "center", marginBottom: "32px" };

const titleStyle = { 
  fontSize: "2rem", 
  fontWeight: "800", 
  color: "#fff", 
  marginBottom: "8px",
  letterSpacing: "-0.5px",
  background: "linear-gradient(to right, #818cf8, #34d399)", // Emerald/Indigo gradient from Dashboard
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const subtitleStyle = { color: "#94a3b8", fontSize: "0.95rem" };

const formStyle = { display: "flex", flexDirection: "column", gap: "18px" };

const inputWrapper = { display: "flex", flexDirection: "column", gap: "8px" };

const labelStyle = { 
  fontSize: "0.85rem", 
  fontWeight: "600", 
  color: "#cbd5e1", 
  marginLeft: "4px" 
};

const modernInput = {
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
  transition: "all 0.2s ease"
};

const registerBtn = {
  marginTop: "10px",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)", // Emerald gradient for "New" actions
  color: "#fff",
  fontSize: "1rem",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 10px 15px -3px rgba(52, 211, 153, 0.2)",
  transition: "transform 0.2s ease"
};

const disabledBtn = { ...registerBtn, opacity: 0.6, cursor: "not-allowed" };

const footerStyle = { 
  marginTop: "32px", 
  textAlign: "center", 
  color: "#64748b", 
  fontSize: "0.9rem" 
};

const linkStyle = { color: "#818cf8", fontWeight: "600", textDecoration: "none" };

// Shared background assets for platform unity
const blob1 = {
  position: "absolute", width: "350px", height: "350px", 
  background: "rgba(52, 211, 153, 0.1)", filter: "blur(90px)",
  top: "-100px", right: "-50px", borderRadius: "50%"
};

const blob2 = {
  position: "absolute", width: "400px", height: "400px", 
  background: "rgba(99, 102, 241, 0.15)", filter: "blur(100px)",
  bottom: "-100px", left: "-100px", borderRadius: "50%"
};

export default Register;