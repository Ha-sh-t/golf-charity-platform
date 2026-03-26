import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({
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
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={pageContainer}>
            {/* Decorative background elements for a modern feel */}
            <div style={blob1}></div>
            <div style={blob2}></div>

            <div style={glassCard}>
                <div style={headerSection}>
                    <h2 style={titleStyle}>Welcome Back</h2>
                    <p style={subtitleStyle}>Sign in to continue your impact.</p>
                </div>

                <form onSubmit={handleSubmit} style={formStyle}>
                    <div style={inputWrapper}>
                        <label style={labelStyle}>Email Address</label>
                        <input
                            name="email"
                            placeholder="name@example.com"
                            onChange={handleChange}
                            style={modernInput}
                            required
                        />
                    </div>

                    <div style={inputWrapper}>
                        <label style={labelStyle}>Password</label>
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
                        style={loading ? disabledBtn : loginBtn}
                        disabled={loading}
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                </form>

                <div style={footerStyle}>
                    <p>Don't have an account? <span style={linkStyle} onClick={()=>{navigate('/register')} }>Join the mission</span></p>
                </div>
            </div>
        </div>
    );
}

// --- Modern UI/UX Styles ---

const pageContainer = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a", // Deep slate background to match dashboard
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: "relative",
    overflow: "hidden"
};

const glassCard = {
    width: "100%",
    maxWidth: "400px",
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
    letterSpacing: "-0.5px"
};

const subtitleStyle = { color: "#94a3b8", fontSize: "0.95rem" };

const formStyle = { display: "flex", flexDirection: "column", gap: "20px" };

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

const loginBtn = {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
    transition: "transform 0.2s ease"
};

const disabledBtn = { ...loginBtn, opacity: 0.6, cursor: "not-allowed" };

const footerStyle = {
    marginTop: "32px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "0.9rem"
};

const linkStyle = { color: "#818cf8", fontWeight: "600", cursor: "pointer" };

// Decorative "Blobs" for atmosphere
const blob1 = {
    position: "absolute", width: "300px", height: "300px",
    background: "rgba(99, 102, 241, 0.2)", filter: "blur(80px)",
    top: "-50px", left: "-50px", borderRadius: "50%"
};

const blob2 = {
    position: "absolute", width: "300px", height: "300px",
    background: "rgba(52, 211, 153, 0.15)", filter: "blur(80px)",
    bottom: "-50px", right: "-50px", borderRadius: "50%"
};

export default Login;