// src/components/Minter.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import TokenMinterABI from '../contracts/TokenMinter.json'; // Path to ABI file
import contractAddress from '../contracts/deployed-address.json'; // Path to deployed address file

const provider = new ethers.providers.JsonRpcProvider("https://api.devnet.solana.com");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider); // Replace with actual private key
const tokenMinterContract = new ethers.Contract(contractAddress.address, TokenMinterABI.abi, signer);

const Minter = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');

    const handleMint = async (e) => {
        e.preventDefault();
        setStatus('Processing...');

        try {
            const tx = await tokenMinterContract.mint(recipient, ethers.utils.parseUnits(amount, 18));
            await tx.wait();
            setStatus('Tokens minted successfully!');
        } catch (error) {
            console.error(error);
            setStatus('Error minting tokens.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Mint Tokens</h2>
            <form onSubmit={handleMint} className="space-y-4">
                <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient Address</label>
                    <input
                        type="text"
                        id="recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Mint Tokens
                </button>
                {status && <p className="mt-4 text-gray-700">{status}</p>}
            </form>
        </div>
    );
};

export default Minter;
