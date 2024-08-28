const MetadataStorage = artifacts.require("MetadataStorage");

module.exports = function(deployer) {
  deployer.deploy(MetadataStorage);
};