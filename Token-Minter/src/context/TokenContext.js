// src/context/TokenContext.js
import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenMinterABI from '../contracts/TokenMinter.json'; // Path to ABI file
import contractAddress from '../contracts/deployed-address.json'; // Path to deployed address file

const provider = new ethers.providers.JsonRpcProvider("https://api.devnet.solana.com");
const tokenMinterContract = new ethers.Contract(contractAddress.address, TokenMinterABI.abi, provider);

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTokens = async () => {
        try {
            // Fetch all tokens. Replace with actual method if needed.
            const totalSupply = await tokenMinterContract.totalSupply();
            const formattedTokens = []; // Replace with actual fetching logic
            setTokens(formattedTokens);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTokens();
    }, []);

    return (
        <TokenContext.Provider value={{ tokens, loading, fetchTokens }}>
            {children}
        </TokenContext.Provider>
    );
};
