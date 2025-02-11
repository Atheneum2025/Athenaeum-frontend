import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import axios from "axios";
import "./Calendar.css";

export default function Calendar() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [events, setEvents] = useState([
        // { title: "Meeting", date: "2025-02-01" },
        { title: "Conference", date: "2025-02-05" },
    ]);

    // const sendData = async () => {
    //     try {
    //         const response = await axios.post(`http://localhost:3000/api/v1/user/:userId/calendar`, { events }, { withCredentials: true });
    //         console.log(response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const handleDateClick = async () => {
        try {
            setIsVisible(true)
            // const response = await axios.post(`http://localhost:3000/api/v1/user/:userId/calendar`, { events }, { withCredentials: true });
            // console.log(response);
        } catch (error) {
            console.error(error);
        }
        // const title = prompt("Enter event title:");
        // if (title) {
        //     setEvents([...events, { title, date: info.dateStr }]);
        // }
    };
    return (
        <>
            <div className="calendar_page">
                <h1>Calendar</h1>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    events={events}
                    dateClick={handleDateClick}
                />
                {
                    isVisible ? (
                        <>
                            <form action="">
                                <label htmlFor="event">Enter Event Title:</label>
                                <input type="text" id="text" />
                                <button type="submit">Save</button>
                            </form>
                        </>
                    ) : (
                        <div>nothing</div>
                    )
                }
                <div>HEllo</div>
            </div>
        </>
    );
}
