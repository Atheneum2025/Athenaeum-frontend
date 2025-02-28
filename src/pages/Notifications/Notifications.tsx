import axios from 'axios';
import './Notifications.css';
import React, { useEffect, useState } from 'react'
import { getAuthenticatedUser } from '../../utils/authUtils';
import axiosInstance from '../../utils/axios';

type NotificationType = {
    _id: string;
    message: string;
    messageBy: string;
    material: string;
    reply: string;
};
export default function Notifications() {

    const { user, isAuthenticated } = getAuthenticatedUser();
    const [courseDetail, setCourseDetail] = useState<NotificationType[]>([]);

    // get all notifications
    useEffect(() => {

        const fetchdata = async () => {
            try {
                const Courseresponse = await fetch("http://localhost:3000/api/v1/users/notifications");
                const Courseresult = await Courseresponse.json();
                setCourseDetail(Courseresult.notifications);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchdata();
    }, []);
    console.log(courseDetail)

    const handlePublish = async (notificationId: string) => {
        console.log(notificationId)

        try {
            const response = await axiosInstance.patch(`/users/notification/${notificationId}/publish`)
            if (response.status === 200) {
                console.log("Material publish status toggled successfully:", response.data);

                setCourseDetail((prevNotifications) =>
                    prevNotifications.filter((notification) => notification._id !== notificationId)
                );
            }
            else {
                console.log(response.data.message);

            }
        } catch (error) {
            console.error(error)
        }
    }

    const [replyMessage, setReplyMessage] = useState<string>("");
    // const [selectedNotification, setSelectedNotification] = useState<NotificationType | null>(null)

    const handleReply = async (e: React.FormEvent, notificationId: string) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/contactUs/${notificationId}/`, { replyMessage }, { withCredentials: true })
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className='items_display_page'>
                <div className="items_display_header">
                    <h1>Notifications :</h1>
                    <div className='item_filters'>
                        <div>Filter  </div>
                        {/* <div>
                            <select onChange={(e) => setSortBy(e.target.value)}>
                                <option value="createdAt">Newest First</option>
                                <option value="coursename">Course Name</option>
                            </select>
                            <select onChange={(e) => setSortType(e.target.value)}>
                                <option value="-1">Descending</option>
                                <option value="1">Ascending</option>
                            </select>
                        </div> */}
                    </div>
                </div>
                <div className="items_cards_list">
                    {
                        isAuthenticated && (
                            <>
                                {
                                    (user.role === "admin" || user.role === "student") && (
                                        <>

                                            {courseDetail.map((notification: NotificationType) => (
                                                <div key={notification._id} className="notification">
                                                    <div>
                                                        <div>{notification.messageBy}</div>
                                                    </div>
                                                    <div className="">
                                                        <div className=''>Message: {notification.message}</div>
                                                        {
                                                            (!notification.reply && user.role === "admin") ? (
                                                                <div>
                                                                    <form action="" onSubmit={(e: any) => handleReply(e, notification._id)}>
                                                                        <label htmlFor="reply_text">Reply </label>
                                                                        <input type="text" id="reply_text" value={replyMessage} onChange={(e: any) => setReplyMessage(e.target.value)} />
                                                                        <button type='submit' >Send</button>
                                                                    </form>
                                                                </div>
                                                            ) : (
                                                                <div>Reply: {notification.reply}</div>
                                                            )
                                                        }
                                                        {
                                                            notification.material && (
                                                                <>
                                                                    <div>Material: {notification.material}</div>
                                                                    <button className='' onClick={() => handlePublish(notification._id)} >Publish</button>
                                                                </>
                                                            )
                                                        }

                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )
                                }

                                {
                                    user.role === "student" && (
                                        <>
                                            {courseDetail.map((notification: NotificationType) => (
                                                <div key={notification._id} className="notification">
                                                    {
                                                        !notification.messageBy && (
                                                            <>
                                                                <div className="">
                                                                    <div className=''>Message: {notification.message}</div>
                                                                    <div>Material: {notification.material}</div>
                                                                </div>
                                                            </>
                                                        )
                                                    }

                                                </div>
                                            ))}
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>

        </>
    )
}
