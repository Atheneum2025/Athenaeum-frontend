import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { useRef } from "react";
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

    const calendarRef = useRef<FullCalendar | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");



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
        fetchData();
    }, [])

    const handleDateClick = (info: any) => {
        setIsVisible(true);
        setDate(info.dateStr)
        // const title = prompt("Enter event title:");
        // if (title) {
        //     setEvents([...events, { title, date: info.dateStr }]);
        // }
    };



    const handleGoToDate = () => {
        if (calendarRef.current && selectedDate) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.gotoDate(selectedDate); // accepts string or Date object
        }
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

                    <div className="goto_date_container" style={{ marginBottom: "1rem" }}>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="goto_date_input"
                        />
                        <button onClick={handleGoToDate} className="goto_date_button">
                            Go To Date
                        </button>
                    </div>


                    <FullCalendar
                        ref={calendarRef} // 👈 Add this line
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
