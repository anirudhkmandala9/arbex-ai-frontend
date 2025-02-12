import React, { useState, useEffect } from "react";
import "./App.css";
import Chart from "chart.js/auto";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [news, setNews] = useState([]);

  // Fetch AI Chatbot Response
  const fetchChatbotResponse = async () => {
    const res = await fetch(
      `https://arbex-ai-backend.onrender.com/chatbot?query=${query}`
    );
    const data = await res.json();
    setResponse(data.response);
  };

  // Fetch Stock Data and Display Chart
  const fetchStockData = async () => {
    const res = await fetch(
      `https://arbex-ai-backend.onrender.com/chart/${stockSymbol}`
    );
    const data = await res.json();
    if (data.error) {
      alert("Stock data not found!");
      return;
    }
    setStockData(data);
    updateChart(data);
  };

  // Fetch News Data
  const fetchNews = async () => {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${stockSymbol}&apiKey=YOUR_NEWSAPI_KEY`);
    const data = await res.json();
    setNews(data.articles.slice(0, 5)); // Show 5 latest news articles
  };

  // Update Stock Chart
  const updateChart = (data) => {
    if (chartInstance) chartInstance.destroy();

    const ctx = document.getElementById("stockChart").getContext("2d");
    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: stockSymbol,
            data: data.datasets[0].data,
            borderColor: "green",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
    });

    setChartInstance(newChart);
  };

  return (
    <div className="container">
      <h1 className="arbex-title">ARBEX AI</h1>

      {/* Chat Section */}
      <div className="chat-section">
        <input
          type="text"
          placeholder="Ask me about finance..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchChatbotResponse}>Ask</button>
        <div className="response-box">{response}</div>
      </div>

      {/* Stock Search Section */}
      <div className="stock-section">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
        />
        <button onClick={() => { fetchStockData(); fetchNews(); }}>Search</button>
      </div>

      {/* Stock Chart */}
      {stockData && (
        <div className="chart-container">
          <canvas id="stockChart"></canvas>
        </div>
      )}

      {/* News Section */}
      <div className="news-section">
        <h2>Latest News</h2>
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
