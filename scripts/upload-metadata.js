const MetadataStorage = artifacts.require("MetadataStorage");
const fs = require('fs');

module.exports = async function(callback) {
  try {
    const metadataStorage = await MetadataStorage.deployed();
    
    const metadataFile = fs.readFileSync('path/to/metadata.json', 'utf8');
    const metadata = JSON.parse(metadataFile);
    
    console.log(`Uploading metadata for token ID: ${metadata.tokenId}`);
    const tx = await metadataStorage.setTokenMetadata(
      metadata.tokenId,
      metadata.name,
      metadata.description,
      metadata.image
    );
    
    console.log(`Metadata uploaded! Transaction: ${tx.tx}`);
    
    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
