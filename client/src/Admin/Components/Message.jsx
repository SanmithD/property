// OwnerChat.jsx
import axios from "axios";
import { useEffect, useState } from "react";

function Message() {
  const [chats, setChats] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerMessages, setCustomerMessages] = useState([]);
  const [reply, setReply] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/contact/owner/chats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChats(res.data.chats));
  }, []);

  const loadChat = async (customerId) => {
    setSelectedCustomer(customerId);
    const res = await axios.get(
      `http://localhost:7000/api/contact/owner/chat/${customerId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCustomerMessages(res.data.chat);
  };

  const sendReply = async (msgId) => {
    await axios.post(
      `http://localhost:7000/api/contact/reply/${msgId}`,
      { message: reply },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadChat(selectedCustomer);
    setReply("");
  };

  return (
    <div className="flex">
      <div className="w-1/3 border-r p-4">
        <h3>Customers</h3>
        {chats.flatMap((chat) =>
          chat.customerMessages.map((m) => (
            <div
              key={m._id}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => loadChat(m.userId)}
            >
              <p>{m.name}</p>
            </div>
          ))
        )}
      </div>
      <div className="w-2/3 p-4">
        {customerMessages.map((m) => (
          <div key={m._id} className="mb-4 border p-2 rounded">
            <p><strong>{m.name}:</strong> {m.message}</p>
            <div className="ml-4 text-sm text-gray-600">
              {m.replies.map((r, i) => (
                <p key={i}><strong>{r.name}:</strong> {r.message}</p>
              ))}
            </div>
            <div className="flex mt-2">
              <input
                className="border p-1 flex-1"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Reply..."
              />
              <button
                className="bg-green-500 text-white px-3"
                onClick={() => sendReply(m._id)}
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Message;
