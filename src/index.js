// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // ✅ Correct path if "App.js" is in "src"



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
