import React, { useState } from "react";
import "./App.css"; // Make sure to update the CSS file for better styling

const App = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResponse = async () => {
    if (!query.trim()) return;
    setLoading(true);
    
    const userMessage = { text: query, type: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(`https://arbex-ai-backend.onrender.com/chatbot?query=${query}`);
      const data = await response.json();
      
      const botMessage = { text: data.response, type: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error fetching response.", type: "bot" }]);
    }

    setQuery("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchResponse();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chat-container">
      <h1 className="title">ARBEX AI</h1>
      
      <div className="chat-box">
        {messages.length === 0 ? (
          <p className="empty-chat">Ask something to start...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))
        )}

        {loading && <div className="loading">...</div>}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask something..."
          className="input-box"
        />
        <button onClick={fetchResponse} className="ask-btn">Ask</button>
        <button onClick={clearChat} className="clear-btn">Clear</button>
      </div>
    </div>
  );
};

export default App;
