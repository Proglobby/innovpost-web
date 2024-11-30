import React, { useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "./firebaseConfig";

function WorkerLogin({ onLogin }) {
    const [workerId, setWorkerId] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!workerId.trim()) {
            setError("Worker ID is required.");
            return;
        }

        try {
            // Reference to workers in Firebase
            const workersRef = ref(database, "agencies/21004/workers");
            const snapshot = await get(workersRef);

            if (snapshot.exists()) {
                const workers = snapshot.val();
                // Check if the entered worker ID exists
                if (Object.keys(workers).includes(workerId)) {
                    onLogin(workerId); // Log in if worker ID is valid
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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Worker Login</h2>
            <input
                type="text"
                placeholder="ID"
                value={workerId}
                onChange={(e) => {
                    setWorkerId(e.target.value);
                    setError(""); // Clear error when typing
                }}
                style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
            />
            <br />
            <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Start Working
            </button>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
}

export default WorkerLogin;
