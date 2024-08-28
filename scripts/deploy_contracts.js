const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const TokenMinterFactory = await ethers.getContractFactory("TokenMinter");
    const mintingCap = ethers.utils.parseUnits("1000000", 18); // Set the minting cap

    // Deploy TokenMinter contract
    const tokenMinter = await TokenMinterFactory.deploy("MyToken", "MTK", mintingCap);
    console.log("Deploying TokenMinter contract...");
    await tokenMinter.deployed();
    console.log("TokenMinter deployed to:", tokenMinter.address);

    // Save the contract address
    const deployedAddressPath = path.resolve(__dirname, 'deployed-address.json');
    fs.writeFileSync(deployedAddressPath, JSON.stringify({ address: tokenMinter.address }, null, 2));

    console.log("Deployment successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
