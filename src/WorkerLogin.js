import React, { useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "./firebaseConfig";
import './App.css'; // Import the CSS file

function WorkerLogin({ onLogin ,onWorkerName}) {
    const [workerId, setWorkerId] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!workerId.trim()) {
            setError("Worker ID is required.");
            return;
        }

        try {
            const workersRef = ref(database, "agencies/21004/workers");
            const snapshot = await get(workersRef);

            if (snapshot.exists()) {
                const workers = snapshot.val();
                if (workers[workerId]) {
                    onWorkerName(workers[workerId].name);
                    onLogin(workerId);
                } else {
                    setError("Invalid Worker ID.");
                }
            } else {
                setError("No workers data found.");
            }
        } catch (err) {
            console.error("Error fetching workers:", err);
            setError("Failed to verify Worker ID. Try again later.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">LOGIN</h1>
                <h2 className="worker-login">Worker Login</h2>
                <input
                    type="text"
                    placeholder="  ID"
                    value={workerId}
                    onChange={(e) => {
                        setWorkerId(e.target.value);
                        setError("");
                    }}
                    className="login-input"
                />
                <button onClick={handleLogin} className="login-button">
                    LOGIN
                </button>
                {error && <p className="error-text">{error}</p>}
            </div>
            <div className="login-image">
                <img src="2.png" alt="Algérie Poste Logo" />
            </div>
        </div>
    );
}

export default WorkerLogin;
