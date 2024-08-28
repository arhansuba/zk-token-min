// src/hooks/useMint.js
import { useState } from 'react';
import { ethers } from 'ethers';
import TokenMinterABI from '../contracts/TokenMinter.json'; // Path to ABI file
import contractAddress from '../contracts/deployed-address.json'; // Path to deployed address file

const provider = new ethers.providers.JsonRpcProvider("https://api.devnet.solana.com");
const signer = provider.getSigner();
const tokenMinterContract = new ethers.Contract(contractAddress.address, TokenMinterABI.abi, signer);

export const useMint = () => {
    const [isMinting, setIsMinting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const mintToken = async (to, amount) => {
        setIsMinting(true);
        setError(null);
        setSuccessMessage("");
        
        try {
            const tx = await tokenMinterContract.mint(to, ethers.utils.parseUnits(amount, 18)); // Adjust decimals if needed
            await tx.wait();
            setSuccessMessage("Token minted successfully!");
        } catch (err) {
            console.error("Minting failed:", err);
            setError("Minting failed. Please try again.");
        } finally {
            setIsMinting(false);
        }
    };

    return {
        mintToken,
        isMinting,
        error,
        successMessage,
    };
};
