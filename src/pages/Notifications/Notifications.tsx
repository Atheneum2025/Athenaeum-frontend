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
};

type MessagesType = {
    _id: string;
    message: string;
    sender: string;
    receiver: string;
    reply: string;
}
export default function Notifications() {

    const { user, isAuthenticated } = getAuthenticatedUser();
    const [notificationDetails, setNotificationDetails] = useState<NotificationType[]>([]);
    const [messageDetail, setMessageDetail] = useState<MessagesType[]>([]);

    // get all notifications
    const fetchMessageData = async () => {
        try {
            const Courseresponse = await axiosInstance.get("/contactUs", { withCredentials: true });
            setMessageDetail(Courseresponse.data.messages);
            // console.log(Courseresponse.data.messages)
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchNotifications = async () => {
        try {
            const reponse = await axiosInstance.get("/users/notifications");
            setNotificationDetails(reponse.data.notifications);
            console.log(reponse)
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchMessageData();
        fetchNotifications();
    }, []);

    console.log(messageDetail)

    const handlePublish = async (notificationId: string) => {
        console.log(notificationId)

        try {
            const response = await axiosInstance.patch(`/users/notification/${notificationId}/publish`)
            if (response.status === 200) {
                console.log("Material publish status toggled successfully:", response.data);

                setNotificationDetails((prevNotifications) =>
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

    const handleReply = async (e: React.FormEvent, messageId: string) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/contactUs/${messageId}/`, { replyMessage }, { withCredentials: true })
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
                                    // (user.role === "admin" || user.role === "student") && (
                                    <>

                                        <div className="notification_section">
                                            <div className='notification'>
                                                <h2>Anouncements</h2>

                                                {notificationDetails.map((notification: NotificationType, index) => (
                                                    <div key={index} className="notification">
                                                        {
                                                           ( notification.messageBy && !(user.role == "student")) && (
                                                                <>
                                                                    <div>
                                                                        <div>{notification.messageBy}</div>
                                                                    </div>
                                                                    <div className="">
                                                                        <div className=''>Message: {notification.message}</div>
                                                                        {
                                                                            notification.material && (
                                                                                <>
                                                                                    <div>Material: {notification.material}</div>
                                                                                    <button className='' onClick={() => handlePublish(notification._id)} >Publish</button>
                                                                                </>
                                                                            )
                                                                        }

                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            (notification.message == "New Material Uploaded" && user.role == "student") && (
                                                                    <div className="">
                                                                        <div className=''>Message: {notification.message}</div>
                                                                        <div>Material: {notification.material}</div>
                                                                    </div>
                                                            )
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='notification'>
                                                <h2>Messages</h2>

                                                {
                                                    messageDetail.map((message: MessagesType, index) => (
                                                        <div key={index}>
                                                            {
                                                                (message.sender == user.username || user.role == 'admin') && (
                                                                    <>

                                                                        <div>Sender : {message.sender}</div>
                                                                        <div>Message : {message.message}</div>
                                                                        {
                                                                            !message.reply && (
                                                                                <form action="" onSubmit={(e: any) => handleReply(e, message._id)}>
                                                                                    <label htmlFor="reply_text">Reply </label>
                                                                                    <input type="text" id="reply_text" value={replyMessage} onChange={(e: any) => setReplyMessage(e.target.value)} />
                                                                                    <button type='submit' >Send</button>
                                                                                </form>
                                                                            )
                                                                        }
                                                                        <div>Reply : {message.reply}</div>

                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                    </>
                                    // )
                                }

                                {/* {
                                    user.role === "student" && (
                                        <>
                                            {notificationDetails.map((notification: NotificationType) => (
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
                                } */}
                            </>
                        )
                    }
                </div>
            </div>

        </>
    )
}
