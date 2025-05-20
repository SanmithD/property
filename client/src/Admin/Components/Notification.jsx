import axios from "axios";
import { useEffect, useState } from "react";

function Notification() {
  const [notifications, setNotifications] = useState([]);

  const allNotification = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/notification/getNotification`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Sort notifications by createdAt descending
      const sorted = (response.data.response || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setNotifications(sorted);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    allNotification();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🔔 Visit Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications found.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <p className="text-gray-800 font-medium">{notif.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                Viewed by: <span className="font-semibold">{notif.customerName}</span>
              </p>
              <p className="text-sm text-gray-400">
                {new Date(notif.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notification;
