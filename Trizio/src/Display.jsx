import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Display.css";
import Footer from "./Footer";
import axiosInstance from "./api/axiosInstance";

const Display = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        try {
            const res = await axiosInstance.get("/allitems");
            setItems(Array.isArray(res.data.items) ? res.data.items : res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="display-container">
                {items.map((item) => (
                    <ModelCard key={item._id} item={item} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

const ModelCard = ({ item }) => {
    const navigate = useNavigate();
    const viewerRef = React.useRef(null);

    useEffect(() => {
        if (!viewerRef.current) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#0d0f22"); // dark background

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(viewerRef.current.clientWidth, viewerRef.current.clientHeight);
        viewerRef.current.innerHTML = "";
        viewerRef.current.appendChild(renderer.domElement);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 2.0));
        const dir1 = new THREE.DirectionalLight(0x51e8ff, 1.0);
        dir1.position.set(5, 10, 7.5);
        scene.add(dir1);
        const dir2 = new THREE.DirectionalLight(0xff51e8, 0.8);
        dir2.position.set(-5, 5, -5);
        scene.add(dir2);
        const dir3 = new THREE.DirectionalLight(0x47ffcc, 0.6);
        dir3.position.set(0, -10, 5);
        scene.add(dir3);

        const loader = new GLTFLoader();
        const modelUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/${item.filename}`;
        loader.load(modelUrl, (gltf) => {
            const model = gltf.scene;
            scene.add(model);

            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);

            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 1.1; // zoom out so model fits
            camera.position.set(0, 0, cameraZ);

            const center = box.getCenter(new THREE.Vector3());
            model.position.set(-center.x, -center.y, -center.z);

            camera.lookAt(new THREE.Vector3(0, 0, 0));

            const animate = () => {
                requestAnimationFrame(animate);
                model.rotation.y += 0.007;
                renderer.render(scene, camera);
            };
            animate();
        });

        return () => renderer.dispose();
    }, [item.filename]);

    return (
        <div
            className="model-card"
            onClick={() => navigate(`/model/${item._id}`)}
            style={{ cursor: "pointer" }}
        >
            <div ref={viewerRef} className="model-viewer"></div>
            <h4>{item.name}</h4>
        </div>
    );
};

export default Display;
