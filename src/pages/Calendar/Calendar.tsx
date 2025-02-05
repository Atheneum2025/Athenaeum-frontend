import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import axios from "axios";

export default function Calendar() {
    const [events, setEvents] = useState([
        { title: "Meeting", date: "2025-02-01" },
        { title: "Conference", date: "2025-02-05" },
    ]);

    const sendData = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/user/:userId/calendar`, {events}, {withCredentials: true});
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDateClick = (info: any) => {
        const title = prompt("Enter event title:");
        if (title) {
            setEvents([...events, { title, date: info.dateStr }]);
        }
    };
    return (
        <>
        <div>Calendar</div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
            />
        </>
    );
}
