// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the main App component
import './styles/main.css'; // Import global CSS

// Render the App component into the root div of index.html
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
