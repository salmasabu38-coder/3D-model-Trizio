import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./ModelPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import axiosInstance from "./api/axiosInstance";


const ModelPage = () => {
    const { id } = useParams();
    const viewerRef = useRef(null);
    const [modelData, setModelData] = useState(null);

    useEffect(() => {
        const fetchModel = async () => {
            try {
                const res = await axiosInstance.get(`/items/${id}`);
                setModelData(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchModel();
    }, [id]);

    useEffect(() => {
        if (!modelData || !viewerRef.current) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#0d0f22");

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(500, 500);
        viewerRef.current.innerHTML = "";
        viewerRef.current.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0x51e8ff, 1.0);
        dirLight.position.set(5, 10, 7.5);
        scene.add(dirLight);

        // Orbit Controls 🌀
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.enablePan = false;

        // Load Model
        const loader = new GLTFLoader();
        const modelUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/${modelData.filename}`;
        loader.load(
            modelUrl,
            (gltf) => {
                const model = gltf.scene;
                scene.add(model);

                // Fit model in view
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);

                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
                cameraZ *= 1.5;
                camera.position.set(0, 0, cameraZ);

                const center = box.getCenter(new THREE.Vector3());
                model.position.set(-center.x, -center.y, -center.z);

                camera.lookAt(new THREE.Vector3(0, 0, 0));

                // Animation Loop
                const animate = () => {
                    requestAnimationFrame(animate);
                    controls.update();
                    renderer.render(scene, camera);
                };
                animate();
            }
        );

        return () => renderer.dispose();
    }, [modelData]);

    if (!modelData) return <p style={{ color: "#fff" }}>Loading...</p>;

    return (
        <div>
            <Navbar />
            <div className="modelpage-container">
                <div className="modelpage-card">
                    <h2 className="modelpage-title">{modelData.name}</h2>
                    <div ref={viewerRef} className="modelpage-viewer"></div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default ModelPage;
