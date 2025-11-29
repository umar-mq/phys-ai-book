import React, { useState } from 'react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Here you would typically also send the message to a backend
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        Chat
      </button>
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
          <div className="p-4 bg-gray-200 rounded-t-lg">
            <h3 className="text-lg font-bold">AI Assistant</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-100 rounded-b-lg flex">
            <input
              type="text"
              placeholder="Ask a question..."
              className="w-full p-2 border rounded-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="bg-blue-500 text-white p-2 ml-2 rounded-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
