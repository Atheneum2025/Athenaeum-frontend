import React, { useEffect, useState } from 'react'
import { getAuthenticatedUser } from '../../../utils/authUtils';
import axiosInstance from '../../../utils/axios';
import Loader from '../../Loader/Loader';
import Delete_Light_Image from '../../../assets/light_theme/delete.png';
import Delete_Dark_Image from '../../../assets/dark_theme/delete.png'

type EventType = {
    _id: string;
    title: string;
    date: string;
}

export default function CalendarSidebar() {
    const { user, isAuthenticated } = getAuthenticatedUser();
    const [loading, setLoading] = useState<boolean>(false);

    const [event, setEvent] = useState<EventType[]>([]);
    const current_date = new Date()
    console.log(current_date.getTime())
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/users/${user._id}/calendar/`, { withCredentials: true });
            // console.log(response);
            const formattedEvents = response.data.events.map((event: any) => ({
                _id: event._id,
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

    const removeFromEvents = async (_id: string) => {
        console.log(_id);

        try {
            const response = await axiosInstance.delete(`/users/${user._id}/calendar/${_id}`, {
                withCredentials: true,
            });
            console.log(response);
            fetchData();
        } catch (error) {
            console.error("Error removing event", error);
        }
    };
    return (
        <div id='sidebar' className="sidebar">
            <div className="viewLater_text">Events :</div>
            {
                loading ? <Loader /> :
                    <>
                        {
                            event.map((event: EventType, index) => (
                                <>
                                    {
                                        
                                        event.date.replace('-', ' ') < current_date.toString().replace('-', ' ') && (
                                            <>
                                                <div key={index} className="viewLater_card" >
                                                    <div>
                                                        <div className='viewLater_name'>{event.date}</div>
                                                        <div>{event.title}</div>
                                                    </div>
                                                    <div className='delete_viewLater' onClick={() => { removeFromEvents(event._id) }}>
                                                        <img src={Delete_Light_Image} alt="" />
                                                        {/* <img src={Delete_Dark_Image} alt="" /> */}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </>
                            ))
                        }

                        {/* <div>Completed {user.viewCount} out of {viewLater.length}</div> */}
                    </>
            }
        </div>
    )
}
