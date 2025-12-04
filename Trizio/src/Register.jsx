import { useState } from "react";
import "./Register.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axiosInstance from "./api/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.name || !formData.email || !formData.password) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    try {
      const res = await axiosInstance.post("/register", formData);
      setMessage("🎉 Registration successful!");
      setFormData({ name: "", email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Registration failed! Try again.");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="register-container">
        <form className="register-card" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          {message && <p className="msg">{message}</p>}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Register</button>

          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <Footer/>
    </div>

  );
};

export default Register;
