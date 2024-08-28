const { ethers } = require("hardhat");
const { Connection, Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction } = require("@solana/web3.js");
const fs = require('fs');
const path = require('path');

// Configure the Solana network
const network = 'devnet'; // Change to 'mainnet-beta' for mainnet
const connection = new Connection(`https://api.${network}.solana.com`);

// Load the Solana wallet
const walletPath = path.resolve(__dirname, 'solana-wallet.json');
const wallet = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
const payer = Keypair.fromSecretKey(Uint8Array.from(wallet));

// Load the compiled contract artifacts
const contractArtifactPath = path.resolve(__dirname, 'artifacts', 'TokenMinter.json');
const contractArtifact = JSON.parse(fs.readFileSync(contractArtifactPath, 'utf8'));

async function main() {
    // Compile the contract using Hardhat
    const TokenMinterFactory = await ethers.getContractFactory("TokenMinter");
    
    // Deploy the contract
    const tokenMinter = await TokenMinterFactory.deploy("MyToken", "MTK", ethers.utils.parseUnits("1000000", 18));
    
    console.log("Deploying TokenMinter contract...");
    
    // Wait for the deployment to be mined
    await tokenMinter.deployed();
    
    console.log("TokenMinter deployed to:", tokenMinter.address);
    
    // Save the contract address
    fs.writeFileSync(path.resolve(__dirname, 'deployed-address.json'), JSON.stringify({ address: tokenMinter.address }, null, 2));
    
    // Optionally, you can also interact with the contract here, e.g., minting tokens
    // const tx = await tokenMinter.mint(payer.publicKey.toBase58(), ethers.utils.parseUnits("1000", 18));
    // await tx.wait();
    // console.log("Minted tokens to:", payer.publicKey.toBase58());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
