import "./App.css";
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  text-align: center;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.arbex-title {
  color: green;
  font-size: 28px;
  margin-bottom: 20px;
}

.chat-section,
.stock-section {
  margin-bottom: 20px;
}

input {
  width: 80%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: darkgreen;
}

.response-box {
  background: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  text-align: left;
}

.chart-container {
  width: 100%;
  height: 300px;
}

.news-section {
  margin-top: 20px;
}

.news-item {
  background: #f4f4f4;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
}

.news-item a {
  text-decoration: none;
  color: blue;
}
