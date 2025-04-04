import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import axiosInstance from "../../utils/axios";
import "./Calendar.css";
import { getAuthenticatedUser } from "../../utils/authUtils";
import Calendar_Dark_Image from "../../assets/dark_theme/calendar.png";
import Calendar_Light_Image from "../../assets/light_theme/calendar.png";
import CalendarSidebar from "../../components/Sidebar/CalendarSidebar/CalendarSidebar";

type EventType = {
    title: string;
    date: Date;
}
export default function Calendar() {

    const { user, isAuthenticated } = getAuthenticatedUser();
    const [refreshCalendar, setRefreshCalendar] = useState(false);
    
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [event, setEvent] = useState<EventType[]>([]);
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<Date>()
    const day = date?.toString();

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/users/${user._id}/calendar/`, { withCredentials: true });
            // console.log(response);
            const formattedEvents = response.data.events.map((event: any) => ({
                title: event.title,  // Ensure correct format
                date: event.date.split("T")[0],
            }));
            setEvent(formattedEvents);

        }
        catch (error) {
            console.error(error);
        }
    }
    console.log(event)

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, [refreshCalendar])

    const handleDateClick = (info: any) => {
        setIsVisible(true);
        setDate(info.dateStr)
        // const title = prompt("Enter event title:");
        // if (title) {
        //     setEvents([...events, { title, date: info.dateStr }]);
        // }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsVisible(true)
            const response = await axiosInstance.post(`/users/${user._id}/calendar`, { title, date }, { withCredentials: true });
            console.log(response);
            setTitle("");
            fetchData();
            setIsVisible(false);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className="material_main_layout">
                <div className="calendar_page">
                    <div className="calendar_text">
                        <h1>Calendar</h1>
                        <img src={Calendar_Light_Image} alt="" />
                        {/* <img src={Calendar_Dark_Image} alt="" /> */}
                    </div>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        selectable={true}
                        events={event}
                        dateClick={handleDateClick}
                    />
                    <div>
                        {/* <div>Upcoming Events</div>
                        {event.length === 0 ? (
                            <p>No upcoming events</p>
                        ) : (
                            <ul>
                                {event.map((event: EventType, index) => (
                                    <li key={index}>
                                        <strong>{event.title}</strong> - {(new Date()).toLocaleString()}
                                        <div>{(event.date).toLocaleString()}</div>
                                    </li>
                                ))}
                            </ul>
                        )} */}
                    </div>
                    {
                        isVisible && (
                            <>
                                <div className="add_new_material">
                                    <div className="add_new_material_form">
                                        <form action="" onSubmit={(e) => handleSubmit(e)}>
                                            <div className="add_new_material_form_header">
                                                <h2>Add New Event</h2>
                                                <button type="button" onClick={() => { setIsVisible(false) }}>✕</button>
                                            </div>
                                            <div>Date : {day}</div>
                                            <div className="form_field">
                                                <label htmlFor="event">Enter Event Title:</label>
                                                <input type="text" id="text" value={title} onChange={(e: any) => setTitle(e.target.value)} />
                                            </div>
                                            <div className="upload_btns">
                                                <button type="button" onClick={() => setIsVisible(false)}>Cancel</button>
                                                <button type="submit" >Save</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="viewLaterSidebar">
                    <CalendarSidebar setRefreshCalendar={setRefreshCalendar} />
                </div>
            </div>
        </>
    );
}
