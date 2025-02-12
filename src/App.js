import React, { useState } from "react";
import App from './App'; // ✅ Correct path if "App.js" is in "src"
 // Importing CSS

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const res = await fetch(`https://arbex-ai-backend.onrender.com/chatbot?query=${query}`);
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="container">
      <h1 className="arbex-title">ARBEX AI</h1>

      <div className="chat-section">
        <input
          type="text"
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleAsk}>Ask</button>
      </div>

      {response && <div className="response-box">{response}</div>}

      <div className="stock-section">
        <h2>Stock Market Charts</h2>
        {/* Stock chart component can be added here */}
      </div>

      <div className="news-section">
        <h2>Market News</h2>
        {/* Market news component can be added here */}
      </div>
    </div>
  );
}

export default App;
