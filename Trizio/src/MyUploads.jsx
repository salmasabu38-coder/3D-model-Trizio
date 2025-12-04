import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import "./MyUploads.css";
import Footer from "./Footer";
import axiosInstance from "./api/axiosInstance"; // <- use global axios instance

// ModelPreview uses dynamic backend URL for GLB
function ModelPreview({ id }) {
  const glbUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/${id}`;
  const { scene } = useGLTF(glbUrl);
  return <primitive object={scene} />;
}

function MyUploads() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const userid = localStorage.getItem("id");

  useEffect(() => {
    if (!userid) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }

    axiosInstance.get(`/items/user/${userid}`)
      .then(res => {
        setItems(res.data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userid]);

  if (loading) return <p style={{ textAlign: "center", color: "#fff" }}>Loading models...</p>;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this model?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/items/${id}`);
      alert("Model deleted!");
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    }
  };

  return (
    <div className="uploads-container">
      <Navbar />
      <h2 className="uploads-title">My Uploaded Models</h2>

      <div className="uploads-grid">
        {items.length === 0 ? (
          <p className="empty-msg">You haven't uploaded any models yet.</p>
        ) : items.map((item) => (
          <div key={item._id} className="uploads-card">
            <div className="viewer-box">
              <Canvas camera={{ position: [2, 2, 4] }}>
                <Stage intensity={1.5} environment="city">
                  <ModelPreview filename={item.filename} />
                </Stage>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Canvas>
            </div>

            <h4 className="upload-model-name">{item.name}</h4>

            <div className="button-row">
              <button
                className="view-btn"
                onClick={() => window.location.href = `/model/${item._id}`}
              >
                View
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MyUploads;
