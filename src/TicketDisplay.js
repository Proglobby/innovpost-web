import React from "react";

function TicketDisplay({ ticketNumber, onNext, onPrevious }) {
    return (
        <div>
            <h1>Ticket: {ticketNumber}</h1>
            <button onClick={onPrevious}>Previous</button>
            <button onClick={onNext}>Next</button>
        </div>
    );
}

export default TicketDisplay;