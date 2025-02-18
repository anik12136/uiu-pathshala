import React, { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

const Notification = ({ notificationCount }) => {
  const [unreadCount, setUnreadCount] = useState(notificationCount);

  // Example: You can fetch notifications or any other logic here if necessary
  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  // Optionally, you can add logic to fetch new notifications here.
  // const fetchNotifications = async () => {
  //   const newNotifications = await apiCallToGetNotifications();
  //   setUnreadCount(newNotifications.length);
  // };

  return (
    <button
      type="button"
      aria-label="Notifications"
      className="relative p-2 hover:bg-gray-200 rounded-full focus:outline-none transition duration-200 ease-in-out">
      {/* Notification Icon */}
      <IoIosNotificationsOutline className="text-black text-2xl hover:text-orange-500 transition duration-200 ease-in-out" />

      {/* Notification Badge */}
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default Notification;
