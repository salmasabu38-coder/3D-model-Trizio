import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Homepage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <Navbar />
      <section className="home-hero">
        <h1 className="home-title">
          Welcome to <span>Trizio</span>
        </h1>

        <p className="home-subtitle">
          Upload and explore your stunning 3D GLB models with smooth interaction.
        </p>

        <div className="home-btn-group">
          <button className="homebtn uploadbtn" onClick={() => navigate("/upload")}>
            Upload Models
          </button>
          <button className="homebtn viewbtn" onClick={() => navigate("/display")}>
            View Models
          </button>
        </div>
      </section>

      <Footer/>
    </div>
  );
}

export default HomePage;
