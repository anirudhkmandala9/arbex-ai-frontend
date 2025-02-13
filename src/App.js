import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [stockData, setStockData] = useState(null);

  const handleSubmit = async () => {
    if (query.toLowerCase().includes("stock price")) {
      const words = query.split(" ");
      const symbol = words[words.length - 1].toUpperCase(); // Extract stock symbol
      fetchStockData(symbol);
    } else {
      fetchChatbotResponse();
    }
  };

  const fetchChatbotResponse = async () => {
    const res = await fetch(`https://arbex-ai-backend.onrender.com/chatbot?query=${query}`);
    const data = await res.json();
    setResponse(data.response);
    setStockData(null); // Clear stock data if chatbot response is used
  };

  const fetchStockData = async (symbol) => {
    const res = await fetch(`https://arbex-ai-backend.onrender.com/stock/${symbol}`);
    const data = await res.json();

    if (data.current_price) {
      setStockData(data);
      setResponse(""); // Clear chatbot response if stock data is available
    } else {
      setResponse("Stock data not available.");
      setStockData(null);
    }
  };

  return (
    <div className="container">
      <h1 className="arbex-title">ARBEX AI</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about stocks..."
      />
      <button onClick={handleSubmit}>Ask</button>

      {response &&
