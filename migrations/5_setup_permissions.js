const TokenFactory = artifacts.require("TokenFactory");
const NFTFactory = artifacts.require("NFTFactory");
const MetadataStorage = artifacts.require("MetadataStorage");

module.exports = async function(deployer, network, accounts) {
  const tokenFactory = await TokenFactory.deployed();
  const nftFactory = await NFTFactory.deployed();
  const metadataStorage = await MetadataStorage.deployed();

  // Authorize NFTFactory to interact with MetadataStorage
  await metadataStorage.authorizeContract(nftFactory.address);

  console.log("Permissions set up successfully");
};