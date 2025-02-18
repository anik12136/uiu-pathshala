import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "./useUser"; // Import your custom user hook

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { dbUser, loading: userLoading, error: userError } = useUser(); // Get user data

  const fetchNotifications = async () => {
    if (userLoading || !dbUser?._id) {
      setLoading(true);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:7000/NotificationsRoutes/getNotifications/${dbUser._id}`
      );
      if (response.data) {
        setNotifications(response.data.notifications || []); // Update notifications state
      }
    } catch (err) {
      setError(err.message || "Error fetching notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }); // Re-fetch notifications whenever dbUser or userLoading changes

  // Mark a single notification as read
  const markNotificationAsRead = async (notificationId) => {
    if (!dbUser?._id) return;

    try {
      const response = await axios.post(
        `http://localhost:7000/NotificationsRoutes/markAsRead`,
        { userId: dbUser._id, notificationId }
      );

      if (response.data.success) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
      }
    } catch (err) {
      console.error("Error marking notification as read:", err.message);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!dbUser?._id) return;

    try {
      const response = await axios.post(
        `http://localhost:7000/NotificationsRoutes/markAsRead`,
        { userId: dbUser._id }
      );

      if (response.data.success) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) => ({ ...notif, isRead: true }))
        );
      }
    } catch (err) {
      console.error("Error marking all notifications as read:", err.message);
    }
  };

  return {
    notifications,
    loading,
    error,
    markNotificationAsRead,
    markAllAsRead,
    refetchNotifications: fetchNotifications, // Expose the fetchNotifications function
  };
};

export default useNotifications;
