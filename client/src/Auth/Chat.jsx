import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:7000");

function Chat({ ownerId }) {
  const token = localStorage.getItem("token");
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleConnect = () => {
    if (!inputMessage.trim()) return;
    socket.emit("sendMessage", { message: inputMessage, ownerId, token });
    setInputMessage("");
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/contact/chats/${ownerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChatMessages(response.data.response || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    socket.on("receive", (data) => {
      fetchMessages();
    });

    fetchMessages();

    return () => {
      socket.off("receive");
    };
  }, []);

  return (
    <div className="h-[500px] w-[600px] flex flex-col border-2">
      <div
        id="allMassages"
        className="w-full flex-1 border-2 overflow-y-auto p-2"
      >
        {chatMessages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm text-gray-700">{msg.message}</p>
            <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="flex border-t p-2">
        <input
          type="text"
          id="message"
          className="flex-1 h-[40px] outline-0 border rounded px-2"
          placeholder="Enter message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="ml-2 px-4 bg-gray-900 text-white text-lg rounded hover:bg-gray-700"
          onClick={handleConnect}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
