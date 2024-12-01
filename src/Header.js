import React from "react";
import './App.css';

function Header({ workerId,workerName, onLogout }) {
    return (
        <div className="header">
            <div className="profile">
                <img src="profilePic.png" alt="Profile"/>
                <div>
                    <div className="name">{workerName}</div>
                    <div className="id">ID:{workerId}</div>
                </div>

            </div>
         <div className="logout" onClick={onLogout}>Logout &nbsp; &nbsp; ➔</div>
        </div>
    );
}

export default Header;
