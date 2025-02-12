import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [chartData, setChartData] = useState(null);

  const fetchStockChart = async (symbol) => {
    const res = await fetch(`https://arbex-ai-backend.onrender.com/chart/${symbol}`);
    const data = await res.json();
    
    if (data.labels) {
      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: symbol,
            data: data.datasets[0].data,
            borderColor: "green",
            fill: false,
          },
        ],
      });
    } else {
      setResponse("Stock data not available.");
    }
  };

  const handleSubmit = async () => {
    if (query.toLowerCase().includes("chart")) {
      const symbol = query.split(" ")[1]; // Extract symbol from input
      fetchStockChart(symbol);
    } else {
      const res = await fetch(`https://arbex-ai-backend.onrender.com/chatbot?query=${query}`);
      const data = await res.json();
      setResponse(data.response);
    }
  };

  return (
    <div className="container">
      <h1 className="arbex-title">ARBEX AI</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask something..." />
      <button onClick={handleSubmit}>Ask</button>
      
      {response && <div className="response-box">{response}</div>}
      
      {chartData && (
        <div className="chart-container">
          <h2>Stock Chart</h2>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}

export default App;
