import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [chartData, setChartData] = useState(null);

  const fetchStockChart = async (symbol) => {
    try {
      const res = await fetch(`https://arbex-ai-backend.onrender.com/finance/yahoo/${symbol}`);
      const data = await res.json();
      
      if (!data.error) {
        setChartData({
          labels: [data.date],  // Only latest available date
          datasets: [
            {
              label: `${symbol} Stock Price`,
              data: [data.close],  // Latest close price
              borderColor: "green",
              backgroundColor: "rgba(0, 255, 0, 0.2)",
              fill: true,
            },
          ],
        });
      } else {
        setResponse("Stock data not available or API limit reached.");
      }
    } catch (error) {
      setResponse("Error fetching stock data.");
    }
  };

  const handleSubmit = async () => {
    if (query.toLowerCase().includes("chart") || query.toLowerCase().includes("price")) {
      const words = query.split(" ");
      const symbol = words[words.length - 1].toUpperCase(); // Extract last word as stock symbol
      fetchStockChart(symbol);
    } else {
      try {
        const res = await fetch(`https://arbex-ai-backend.onrender.com/chatbot?query=${query}`);
        const data = await res.json();
        setResponse(data.response);
      } catch (error) {
        setResponse("Chatbot error. Try again.");
      }
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

