// TicketDisplay.js
import React from "react";
import './App.css';

function TicketDisplay({ ticketNumber, onNext, onPrevious }) {
    return (
        <div className="ticket-display">
            <h1>Ticket </h1>
            <h3>NUM : 0{ticketNumber}</h3>
            <div className="buttons">
                <button onClick={onNext}>Next</button>
                <button onClick={onPrevious}>Previous</button>

            </div>
        </div>
    );
}

export default TicketDisplay;
