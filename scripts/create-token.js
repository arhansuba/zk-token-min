const TokenFactory = artifacts.require("TokenFactory");

module.exports = async function(callback) {
  try {
    const tokenFactory = await TokenFactory.deployed();
    
    const tokenName = "My Token";
    const tokenSymbol = "MTK";
    const initialSupply = web3.utils.toWei("1000000", "ether"); // 1 million tokens
    
    console.log(`Creating token: ${tokenName} (${tokenSymbol})`);
    const tx = await tokenFactory.createToken(tokenName, tokenSymbol, initialSupply);
    
    console.log(`Token created! Transaction: ${tx.tx}`);
    console.log(`Token address: ${tx.logs[0].args.tokenAddress}`);
    
    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
