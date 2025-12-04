import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import axiosInstance from "./api/axiosInstance.js";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id")
    if (token && id) navigate("/");
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/login", formData);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        setError("✔ Login Successful!");
        setTimeout(() => navigate("/home"), 1000);
      }
    } catch (err) {
      setError("❌ Login failed! Check credentials.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar/>
      <div className="login-container">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>

          {error && <p className="msg">{error}</p>}

          <input
            className="fieldlogin"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="fieldlogin"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading} className="loginbtn">
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="register-text">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
      <Footer/>
    </div>

  );
}

export default Login;
