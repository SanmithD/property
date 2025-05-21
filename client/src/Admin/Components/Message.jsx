import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:7000");

function Message() {
  const token = localStorage.getItem("token");
  const ownerId = localStorage.getItem("ownerId");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  const handleConnect = () => {
    socket.emit("sendMessage", { message, ownerId, token });
    fetchMessages();
  };

  const getAllUserMessages = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/contact/ownerMsg", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllMessages(res.data.response || []);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async (customer) => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/contact/user-chats/${customer}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setChatMessages(res.data.response || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("receive", () => {
      fetchMessages();
    });
    getAllUserMessages();
  }, []);

  return (
    <div className="flex h-[500px] w-full">
      <div className="w-[300px] border-r p-3 overflow-y-auto">
        <h2 className="font-bold mb-3">All Customers</h2>
        {allMessages.length > 0 ? (
          allMessages.map((msg, index) => (
            <div key={index} className="p-2 bg-gray-100 rounded mb-2 cursor-pointer " onClick={()=>fetchMessages(msg.customer)} >
              <p>Customer: {msg.customer || "Unknown"}</p>
              <p className="text-xs text-gray-500">Message: {msg.message}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">No messages found</p>
        )}
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 border p-2 rounded">
          {chatMessages.map((msg, index) => (
            <div key={index} className="mb-2">
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 border p-2"
            placeholder="Enter message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleConnect}
            className="bg-gray-900 text-white px-4"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
