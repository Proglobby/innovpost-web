import React from "react";

function CustomerInfo({ customer }) {
    if (!customer) return <div className={"customer"}><h3>Physical Ticket</h3></div>;

    return (
        <div className={"customer"}>
            <h3>Customer <p>Information</p></h3>
            <div className={"customerInfo"}>
                <p>{customer.name}</p>
                <p> {customer.id}</p>
                <p>{customer.phone}</p>
            </div>
        </div>
    );
}

export default CustomerInfo;
