// migrations/3_deploy_nft_factory.js
const NFTFactory = artifacts.require("NFTFactory");

module.exports = function(deployer) {
  deployer.deploy(NFTFactory);
};
