// src/components/TokenList.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TokenMinterABI from '../contracts/TokenMinter.json'; // Path to ABI file
import contractAddress from '../contracts/deployed-address.json'; // Path to deployed address file

const provider = new ethers.providers.JsonRpcProvider("https://api.devnet.solana.com");
const tokenMinterContract = new ethers.Contract(contractAddress.address, TokenMinterABI.abi, provider);

const TokenList = () => {
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTokens = async () => {
        try {
            // Example: Fetch all tokens. Replace with actual method if needed.
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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Minted Tokens</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tokens.map((token, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{token.recipient}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{token.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TokenList;
