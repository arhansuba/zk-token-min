const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

// Load the contract ABI and address
const contractArtifactPath = path.resolve(__dirname, 'artifacts', 'TokenMinter.json');
const contractArtifact = JSON.parse(fs.readFileSync(contractArtifactPath, 'utf8'));
const { abi } = contractArtifact;

// Load the deployed contract address
const deployedAddressPath = path.resolve(__dirname, 'deployed-address.json');
const { address: contractAddress } = JSON.parse(fs.readFileSync(deployedAddressPath, 'utf8'));

// Configure the provider and signer
const provider = new ethers.providers.JsonRpcProvider("https://api.devnet.solana.com");
const walletPath = path.resolve(__dirname, 'solana-wallet.json');
const wallet = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
const signer = new ethers.Wallet(wallet.privateKey, provider);

async function mintToken(to, amount) {
    const tokenMinter = new ethers.Contract(contractAddress, abi, signer);

    try {
        // Convert amount to the appropriate units
        const amountInUnits = ethers.utils.parseUnits(amount.toString(), 18);

        // Mint the tokens
        console.log(`Minting ${amount} tokens to ${to}...`);
        const tx = await tokenMinter.mint(to, amountInUnits);
        await tx.wait();

        console.log(`Successfully minted ${amount} tokens to ${to}.`);
    } catch (error) {
        console.error("Error minting tokens:", error);
    }
}

// Example usage
const recipientAddress = "0xRecipientAddressHere"; // Replace with actual recipient address
const mintAmount = 1000; // Replace with the amount to mint

mintToken(recipientAddress, mintAmount);
