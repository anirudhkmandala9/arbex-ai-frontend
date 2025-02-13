import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [stockData, setStockData] = useState(null);

  const handleSubmit = async () => {
    if (query.toLowerCase().includes("stock price")) {
      const symbol = query.split(" ").pop().toUpperCase(); // Extract stock symbol
      fetchStockData(symbol);
    } else {
      const res = await fetch(`https://arbex-ai-backend.onrender.com/chatbot?query=${query}`);
      const data = await res.json();
      setResponse(data.response);
    }
  };

  const fetchStockData = async (symbol) => {
    const res = await fetch(`https://arbex-ai-backend.onrender.com/stock/${symbol}`);
    const data = await res.json();
    
    if (data.current_price) {
      setStockData(data);
      setResponse("");
    } else {
      setResponse("Stock data not available.");
    }
  };

  return (
    <div className="container">
      <h1 className="arbex-title">ARBEX AI</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask about stocks..." />
      <button onClick={handleSubmit}>Ask</button>
      
      {response && <div className="response-box">{response}</div>}
      
      {stockData && (
        <div className="response-box">
          <h2>{stockData.symbol} Stock Data</h2>
          <p><strong>Current Price:</strong> ${stockData.current_price}</p>
          <p><strong>High:</strong> ${stockData.high_price}</p>
          <p><strong>Low:</strong> ${stockData.low_price}</p>
          <p><strong>Open:</strong> ${stockData.open_price}</p>
          <p><strong>Previous Close:</strong> ${stockData.previous_close}</p>
        </div>
      )}
    </div>
  );
}

export default App;
