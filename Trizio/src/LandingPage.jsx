import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./LandingPage.css";
import Footer from "./Footer";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); 
    }
  }, [navigate]);

  return (
    <div className="landing-body">
      <div className="fullpage">
 <header className="nav">
        <h2 className="logo">Trizio</h2>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </header>

      <section className="hero">
        <h1 className="hero-title">
          Upload. View. Experience <span>3D</span> Like Never Before.
        </h1>
        <p className="hero-subtitle">
          Trizio lets you upload, store & preview GLB 3D models directly in your browser — fast and seamless.
        </p>

        <button className="cta-btn" onClick={() => navigate("/register")}>
          Get Started
        </button>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🚀 Fast Uploads</h3>
          <p>Store your 3D models securely and access anytime.</p>
        </div>
        <div className="feature-card">
          <h3>🌐 Live Preview</h3>
          <p>Rotate, inspect & interact with 3D models instantly.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Safe Storage</h3>
          <p>Your models stay protected and always accessible.</p>
        </div>
      </section>
      </div>
      <Footer/>
    </div>
  );
}

export default LandingPage;
