import axios from "axios";
import { useState } from "react";

function Contact({owner}) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    console.log(owner)
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:7000/api/contact/message/${id}`,
        { message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("");
      alert("Message sent");
    } catch (err) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="p-4">
      <h2>Message Owner</h2>
      <textarea
        className="border p-2 w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default Contact;
