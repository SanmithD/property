function Chat({ messages }) {
  return (
    <div className="h-64 overflow-y-auto border p-2 bg-gray-50 rounded">
      {messages.map((msg, idx) => (
        <div key={idx} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
          <span className="inline-block px-3 py-1 rounded bg-gray-200">
            <strong>{msg.sender}:</strong> {msg.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Chat;
