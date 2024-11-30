import React from "react";

function CustomerInfo({ customer }) {
    if (!customer) return <div><h2>Physical Ticket</h2></div>;

    return (
        <div>
            <h3>Customer Information</h3>
            <p>Name: {customer.name}</p>
            <p>CCP: {customer.id}</p>
            <p>Phone: {customer.phone}</p>
        </div>
    );
}

export default CustomerInfo;
