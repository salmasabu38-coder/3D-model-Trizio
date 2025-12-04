import { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token"); 

  const handleHomeClick = () => {
    navigate(token ? "/home" : "/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container fullnav">
        <div className="navbarlogo">Trizio</div>

        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <li className="items">
            <button className="itemlink btnlink" onClick={handleHomeClick}>
              Home
            </button>
          </li>

          
          {token && (
            <>
              <li className="items">
                <button className="itemlink btnlink" onClick={() => navigate("/upload")}>
                  Upload
                </button>
              </li>
              <li className="items">
                <button className="itemlink btnlink" onClick={() => navigate("/display")}>
                  Models
                </button>
              </li>
              <li className="items">
                <button className="itemlink btnlink" onClick={() => navigate("/myuploads")}>
                  My Uploads
                </button>
              </li>
              <li className="items">
                <button className="itemlink btnlink" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}

          
          {!token && (
            <li className="items">
              <button className="itemlink btnlink" onClick={() => navigate("/login")}>
                Login
              </button>
            </li>
          )}
        </ul>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
