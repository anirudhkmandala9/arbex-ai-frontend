import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const fetchResponse = async () => {
    const res = await fetch(`https://arbex-ai-backend.onrender.com/chatbot?query=${query}`);
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>ARBEX AI</h1>
      <input 
        type="text" 
        placeholder="Ask about finance..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchResponse}>Ask</button>
      <h3>Response: {response}</h3>
    </div>
  );
}

export default App;
