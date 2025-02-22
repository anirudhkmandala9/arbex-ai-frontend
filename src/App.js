import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]); // Store chat history
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null); // For auto-scrolling

  const fetchResponse = async () => {
    if (!query.trim()) return; // Prevent empty messages
    setIsLoading(true);

    const userMessage = { text: query, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const res = await fetch(
        `https://arbex-ai-backend.onrender.com/chatbot?query=${query}`
      );
      const data = await res.json();
      const aiMessage = { text: data.response, sender: "ai" };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: Unable to get response.", sender: "ai" },
      ]);
    }

    setIsLoading(false);
    setQuery(""); // Clear input after sending
  };

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <h1 className="arbex-title">ARBEX AI</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="typing-indicator">AI is typing...</div>}
        <div ref={chatContainerRef}></div>
      </div>
      <div className="input-container">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Arbex AI..."
        />
        <button onClick={fetchResponse}>Ask</button>
      </div>
    </div>
  );
}

export default App;
