// src/App.js
import React from 'react';
import './styles/main.css'; // Import the CSS file
import Minter from './components/Minter'; // Import the Minter component
import Header from './components/Header'; // Import the Header component
import { TokenProvider } from './context/TokenContext'; // Import the TokenProvider

const App = () => {
    return (
        <TokenProvider>
            <div className="container">
                <Header /> {/* Render the Header component */}
                <main>
                    <Minter /> {/* Render the Minter component */}
                </main>
            </div>
        </TokenProvider>
    );
};

export default App;
