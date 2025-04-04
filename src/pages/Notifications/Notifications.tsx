import axios from "axios";
import "./Notifications.css";
import React, { useEffect, useState } from "react";
import { getAuthenticatedUser } from "../../utils/authUtils";
import axiosInstance from "../../utils/axios";

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
};

interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  date: string;
}

export default function Notifications() {
  const { user, isAuthenticated } = getAuthenticatedUser();
  const [notificationDetails, setNotificationDetails] = useState<
    NotificationType[]
  >([]);
  const [messageDetail, setMessageDetail] = useState<MessagesType[]>([]);
  const [activeTab, setActiveTab] = useState<"announcements" | "messages">(
    "announcements"
  );
  const [selectedMessage, setSelectedMessage] = useState<MessagesType | null>(
    null
  );

  const fetchMessageData = async () => {
    try {
      const Courseresponse = await axiosInstance.get("/contactUs", {
        withCredentials: true,
      });
      setMessageDetail(Courseresponse.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const reponse = await axiosInstance.get("/users/notifications");
      setNotificationDetails(reponse.data.notifications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMessageData();
    fetchNotifications();
  }, []);

  const handlePublish = async (notificationId: string) => {
    try {
      const response = await axiosInstance.patch(
        `/users/notification/${notificationId}/publish`
      );
      if (response.status === 200) {
        setNotificationDetails((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notificationId
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [replyMessage, setReplyMessage] = useState<string>("");

  const handleReply = async (e: React.FormEvent, messageId: string) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/contactUs/${messageId}/`,
        { replyMessage },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePopup = () => {
    setSelectedMessage(null);
    setReplyMessage("");
  };

  return (
    <>
      <div className="items_display_page">
        <div className="items_display_header">
          <h1>Notifications :</h1>
          <div className="item_filters">
            <div>Filter </div>
          </div>
        </div>
        <div className="items_cards_list">
          {isAuthenticated && (
            <div className="notification_section">
              <div className="tab-buttons">
                <button
                  className={`tab-button ${activeTab === "announcements" ? "active" : ""}`}
                  onClick={() => setActiveTab("announcements")}
                >
                  Announcements
                </button>
                <button
                  className={`tab-button ${activeTab === "messages" ? "active" : ""}`}
                  onClick={() => setActiveTab("messages")}
                >
                  Messages
                </button>
              </div>
              <div className="tab-content">
                <div className={`tab-pane ${activeTab === "announcements" ? "active" : ""}`}>
                  <div className="notification">
                    {/* <h2>Announcements</h2> */}
                    {notificationDetails.map((notification: NotificationType, index) => (
                      <div key={index} className="notification">
                        {notification.messageBy && !(user.role == "student") && (
                          <div className="notification-content">
                            <div className="sender-name">
                              {notification.messageBy}
                            </div>
                            <div className="message-text">
                              Message: {notification.message}
                            </div>
                            {notification.material && (
                              <>
                                <div className="material-text">
                                  Material: {notification.material}
                                </div>
                                {user.role == "admin" ? (
                                  <button className="publish-button" onClick={() => handlePublish(notification._id)}>Publish</button>
                                ) : (
                                  <div>Published</div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                        
                      </div>
                    )
                    )}
                  </div>
                </div>
                <div
                  className={`tab-pane ${activeTab === "messages" ? "active" : ""}`}
                >
                  <div className="messages-container">
                    <div className="messages-list">
                      {messageDetail.map((message: MessagesType) => (
                        <div
                          key={message._id}
                          className="message-item"
                          onClick={() => setSelectedMessage(message)}
                        >
                          <div className="message-avatar">
                            <img
                              src="/default-avatar.png"
                              alt={message.sender}
                            />
                          </div>
                          <div className="message-preview">
                            <div className="message-header">
                              <div className="message-sender">
                                {message.sender}
                              </div>
                              <div className="message-date">Today</div>
                            </div>
                            <div className="message-excerpt">
                              {message.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Popup */}
      {selectedMessage && (
        <div className="message-popup-overlay" onClick={handleClosePopup}>
          <div className="message-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>{selectedMessage.sender}</h3>
              <button className="close-button" onClick={handleClosePopup}>
                ×
              </button>
            </div>
            <div className="popup-content">
              <div className="message-full">{selectedMessage.message}</div>
              {selectedMessage.reply ? (
                <div className="reply-section">
                  <div className="reply-label">Reply:</div>
                  <div className="reply-text">{selectedMessage.reply}</div>
                </div>
              ) : (
                (selectedMessage.sender === user.username ||
                  user.role === "admin") && (
                  <form
                    onSubmit={(e) => {
                      handleReply(e, selectedMessage._id);
                      handleClosePopup();
                    }}
                    className="reply-form"
                  >
                    <input
                      type="text"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="reply-input"
                    />
                    <button type="submit" className="send-button">
                      Send Reply
                    </button>
                  </form>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}