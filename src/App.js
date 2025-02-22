import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [chartData, setChartData] = useState(null);
  const [stockPrice, setStockPrice] = useState(null);

  // Fetch AI Response
  const fetchAIResponse = async () => {
    const res = await fetch(`https://arbex-ai-backend.onrender.com/chatbot?query=${query}`);
    const data = await res.json();
    setResponse(data.response || "Error fetching AI response.");
  };

  // Fetch Stock Data
 const fetchStockData = async (symbol) => {
    try {
        const res = await fetch(`https://arbex-ai-backend.onrender.com/stock/${symbol}`);
        const data = await res.json();
        console.log(data);  // Check in browser console

        if (data.current_price) {
            setStockPrice(`Current price of ${symbol}: $${data.current_price}`);
        } else {
            setStockPrice("Stock data not available.");
        }
    } catch (error) {
        console.error("Error fetching stock data:", error);
        setStockPrice("Error retrieving data.");
    }
};


  // Fetch Stock Chart
  const fetchStockChart = async (symbol) => {
    const res = await fetch(`https://arbex-ai-backend.onrender.com/chart/${symbol}`);
    const data = await res.json();
    
    if (data.labels) {
      setChartData({
        labels: data.labels.map(ts => new Date(ts * 1000).toLocaleDateString()),
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
      setChartData(null);
    }
  };

  // Handle Submit
  const handleSubmit = async () => {
    if (query.toLowerCase().startsWith("stock")) {
      const symbol = query.split(" ")[1]; // Extract stock symbol
      fetchStockData(symbol);
      fetchStockChart(symbol);
    } else {
      fetchAIResponse();
    }
  };

  return (
    <div className="container">
      <h1 className="arbex-title">ARBEX AI</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask something..." />
      <button onClick={handleSubmit}>Ask</button>
      
      {response && <div className="response-box">{response}</div>}
      {stockPrice && <div className="response-box">{stockPrice}</div>}

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
