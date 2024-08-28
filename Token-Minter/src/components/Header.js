// src/components/Header.js
import React from 'react';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Token Minter</h1>
                <nav>
                    <a href="/" className="mx-2">Home</a>
                    <a href="/mint" className="mx-2">Mint Tokens</a>
                    <a href="/tokens" className="mx-2">Token List</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
