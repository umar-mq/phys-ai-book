import React, { useState } from 'react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            {/* Chat messages will go here */}
          </div>
          <div className="p-4 bg-gray-100 rounded-b-lg">
            <input
              type="text"
              placeholder="Ask a question..."
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
