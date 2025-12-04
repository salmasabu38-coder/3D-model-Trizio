import "./Footer.css";

function Footer() {
  return (
    <footer className="trizio-footer">
      <div className="footer-content">
        <h2 className="footer-logo">Trizio</h2>
        <p className="footer-text">
          Upload, Explore & Interact with Stunning 3D Models
        </p>

        <p className="footer-copy">
          © {new Date().getFullYear()} Trizio — Built for 3D Model Enthusiasts
        </p>
      </div>
    </footer>
  );
}

export default Footer;
