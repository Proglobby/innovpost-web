import { getDatabase, ref, get, child } from "firebase/database";

export const fetchTicketAndUserDetails = async (postNumber, ticketNumber) => {
    const dbRef = ref(getDatabase());

    try {
        // Check if the ticket exists in the agency tickets node
        const ticketSnapshot = await get(child(dbRef, `agencies/${postNumber}/tickets/${ticketNumber}`));

        if (ticketSnapshot.exists()) {
            const ticketData = ticketSnapshot.val();

            // If ticket is digital, find user associated with it
            const usersSnapshot = await get(child(dbRef, "users"));
            if (usersSnapshot.exists()) {
                const usersData = usersSnapshot.val();

                for (const userId in usersData) {
                    const userTickets = usersData[userId].tickets;
                    if (userTickets && userTickets[ticketNumber]) {
                        return {
                            isDigital: true,
                            user: { ...usersData[userId], ticketInfo: userTickets[ticketNumber] },
                            ticketData,
                        };
                    }
                }
            }

            return { isDigital: false, ticketData }; // Ticket exists but no user is found
        }

        // Ticket does not exist in agencies (physical ticket)
        return { isDigital: false };
    } catch (error) {
        console.error("Error fetching ticket details:", error);
        return { isDigital: false };
    }
};
