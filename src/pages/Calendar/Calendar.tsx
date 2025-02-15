import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import axiosInstance from "../../utils/axios";
import "./Calendar.css";
import { getAuthenticatedUser } from "../../utils/authUtils";

type EventType = {
    event: string;
    date: Date;
}
export default function Calendar() {

    const { user, isAuthenticated } = getAuthenticatedUser();
    
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [event, setEvent] = useState<EventType[]>([]);
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<Date>()

    const fetchData = async () => {
        try{
            const response = await axiosInstance.get(`/users/${user._id}/calendar/`, {withCredentials : true});
            // console.log(response);
            const formattedEvents = response.data.events.map((event: any) => ({
                title: event.title,  // Ensure correct format
                date: event.date.split("T")[0],
            }));
            setEvent(formattedEvents);

        }
        catch(error){
            console.error(error);
        }
    }
    console.log(event)

    useEffect(()=>{
        fetchData();
    },[])

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
            setTitle("")
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className="calendar_page">
                <h1>Calendar</h1>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    events={event}
                    dateClick={handleDateClick}
                />
                {
                    isVisible && (
                        <>
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                <label htmlFor="event">Enter Event Title:</label>
                                <input type="text" id="text" value={title} onChange={(e: any)=>setTitle(e.target.value)} />
                                <button type="submit">Save</button>
                            </form>
                        </>
                    ) 
                }
                <div>HEllo</div>
            </div>
        </>
    );
}
