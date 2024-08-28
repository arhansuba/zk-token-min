const NFTFactory = artifacts.require("NFTFactory");

module.exports = async function(callback) {
  try {
    const nftFactory = await NFTFactory.deployed();
    
    const nftName = "My NFT Collection";
    const nftSymbol = "MNFT";
    const baseURI = "https://api.example.com/metadata/";
    
    console.log(`Creating NFT collection: ${nftName} (${nftSymbol})`);
    const tx = await nftFactory.createNFTCollection(nftName, nftSymbol, baseURI);
    
    console.log(`NFT collection created! Transaction: ${tx.tx}`);
    console.log(`NFT collection address: ${tx.logs[0].args.nftAddress}`);
    
    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
