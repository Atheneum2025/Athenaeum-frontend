import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getAuthenticatedUser } from '../../utils/authUtils';

type NotificationType = {
    _id: string;
    message: string;
    messageBy: string;
    material: string;
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
            const response = await axios.patch(`http://localhost:3000/api/v1/users/notification/${notificationId}/publish`)
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
    return (
        <>
            <div>Notifications</div>
            <div>By : Professor James</div>
            <div>Message: Please Publish this material</div>
            <div>material : Link</div>
            <button>Publish</button>


            <div>
                <div className='grid_layout'>
                    <div>Professor</div>
                    <div>Message</div>
                    <div>Material</div>
                    <div>Publish Status</div>
                </div>
            </div>
            {
                user.role === "admin" && (
                    <>

                        {courseDetail.map((notification: NotificationType) => (
                            <div key={notification._id} className="course_card">
                                <div>
                                    <div>{notification.messageBy}</div>
                                </div>
                                <div className="course_details">
                                    <div className='course_name'>Course Name: {notification.message}</div>
                                    <div className='course_description'>Description: {notification.material}</div>
                                    <button className='course_ratings' onClick={() => handlePublish(notification._id)} >Publish</button>
                                    <div>Subjects no.: 45</div>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
        </>
    )
}
