import './App.css';
import WorkerLogin from "./WorkerLogin";
import TicketDisplay from "./TicketDisplay";
import CustomerInfo from "./CustomerInfo";
import { useState, useEffect } from "react";
//import { fetchTicketAndUserDetails } from "./firebase-utils"; // Import the Firebase utility function
import { ref, get, child ,update,push} from 'firebase/database';
import { database } from './firebaseConfig';



function App() {
    const [workerId, setWorkerId] = useState(null);
    const [ticketNumber, setTicketNumber] = useState(1);
    const [customers, setCustomers] = useState([]);
    const [agency,setAgency]=useState({})


    const handleNext = async () => {
        const newTicketNumber = Math.min(ticketNumber + 1, agency.total);
        setTicketNumber(newTicketNumber);

        try {
            const dbRef = ref(database, 'agencies/21004');
            await update(dbRef, { index: newTicketNumber });
        } catch (error) {
            console.error("Error updating index:", error);
        }

        if (currentCustomer) {
            const feedbackRef = ref(database, `users/${currentCustomer.id}/feedback`);
            const feedbackSnapshot = await get(feedbackRef);
            const feedbackData = feedbackSnapshot.val();
            const newKey = feedbackData ? Object.keys(feedbackData).length : 0;
            const newFeedbackRef = ref(database, `users/${currentCustomer.id}/feedback/${newKey}`);
            await update(newFeedbackRef, { workerName: workerId });
        }
    }



    const handlePrevious = () => {
        setTicketNumber((prev) => Math.max(prev - 1, 1));
    };

    const currentCustomer = customers.find(customer =>
        Object.values(customer.tickets || {}).some(ticket => ticket.index === ticketNumber)
    );    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(database);
            try {
                const snapshot = await get(child(dbRef, 'agencies/21004'));
                if (snapshot.exists()) {
                    const agency = snapshot.val();
                    setAgency(agency)
                    setTicketNumber(agency.index);
                    console.log(agency)

                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const dbRef = ref(database);
            try {
                const snapshot = await get(child(dbRef, 'users'));
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    const customersArray = Object.keys(usersData).map(userId => ({
                        id: userId,
                        ...usersData[userId]
                    }));
                    setCustomers(customersArray);
                    console.log(customersArray);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUsers();
    }, []);
    if (!workerId) {
        return <WorkerLogin onLogin={setWorkerId} />;
    }

    return (
        <div>
            <h1>Post Office System</h1>
            <TicketDisplay
                ticketNumber={ticketNumber}
                onNext={handleNext}
                onPrevious={handlePrevious}
            />
            <CustomerInfo customer={currentCustomer} />
        </div>
    );
}

export default App;