// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../utils/Counters.sol";

contract NFTCollection is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private _baseTokenURI;

    constructor(string memory name, string memory symbol, string memory baseTokenURI) ERC721(name, symbol) Ownable(msg.sender) {
        _baseTokenURI = baseTokenURI;
    }

    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory newBaseTokenURI) public onlyOwner {
        _baseTokenURI = newBaseTokenURI;
    }
}

contract NFTFactory {
    event NFTCollectionCreated(address indexed creator, address nftAddress);

    function createNFTCollection(string memory name, string memory symbol, string memory baseTokenURI) public returns (address) {
        NFTCollection newNFTCollection = new NFTCollection(name, symbol, baseTokenURI);
        newNFTCollection.transferOwnership(msg.sender);
        
        emit NFTCollectionCreated(msg.sender, address(newNFTCollection));
        return address(newNFTCollection);
    }
}