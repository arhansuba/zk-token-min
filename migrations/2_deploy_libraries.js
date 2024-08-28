/ migrations/2_deploy_token_factory.js
const TokenFactory = artifacts.require("TokenFactory");

module.exports = function(deployer) {
  deployer.deploy(TokenFactory);
};
