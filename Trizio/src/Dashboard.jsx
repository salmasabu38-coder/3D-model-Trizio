import { useState } from "react";
import "./Dashboard.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axiosInstance from "./api/axiosInstance"

function Dashboard() {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("id");
    if (!userId) {
        alert("Please login first");
        window.location.href = "/login";
    }

    function onFileChange(e) {
        const selectedFile = e.target.files[0];
        if (!selectedFile.name.endsWith(".glb")) {
            setError("Please select a .glb file");
            return;
        }
        setFile(selectedFile);
        setError(null);
    }

    async function uploadModel() {
        if (!file) {
            setError("Select a .glb model!");
            return;
        }
        if (!name) {
            setError("Enter model name!");
            return;
        }

        const form = new FormData();
        form.append("file", file);
        form.append("name", name);
        form.append("userid", userId);

        try {
            setLoading(true);
            await axiosInstance.post("/items", form)
                .then(res => console.log(res.data))
                .catch(err => console.error(err));

            setFile(null);
            setName("");
            alert("Model uploaded successfully!");
        } catch (err) {
            setError("Upload failed");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div style={{ padding: "20px" }} className="fullbody">
                <h2 className="mainheading">Upload 3D Models (.glb)</h2>

                <input className="fileupload" type="file" accept=".glb"
                    onChange={onFileChange} style={{ marginTop: "10px" }} />
                <br /><br />

                <input className="nameofmodel" type="text" placeholder="Model Name"
                    value={name} onChange={(e) => setName(e.target.value)} />
                <br /><br />

                <button className="uploadbtn" onClick={uploadModel}
                    disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <Footer/>
        </div>
    );
}

export default Dashboard;
