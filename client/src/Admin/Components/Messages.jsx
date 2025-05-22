import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Chat from '../../Auth/Chat';

const socket = io('http://localhost:7000');

function AdminChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit('admin-message', message);
    setMessages(prev => [...prev, { sender: 'You', text: message }]);
    setMessage('');
  };

  useEffect(() => {
    const receive = (msg) => {
      setMessages(prev => [...prev, { sender: 'User', text: msg }]);
    };

    socket.on('admin-receive', receive);
    return () => socket.off('admin-receive', receive);
  }, []);

  return (
    <div className="border-2 max-w-md mx-auto p-4 bg-white shadow rounded">
      <Chat messages={messages} />
      <form onSubmit={handleSend} className="flex mt-4">
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-l px-3 py-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
}

export default AdminChat;
