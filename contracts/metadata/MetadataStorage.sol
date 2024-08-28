// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract MetadataStorage is Ownable {
    using Strings for uint256;

    struct TokenMetadata {
        string name;
        string description;
        string image;
        mapping(string => string) attributes;
    }

    mapping(uint256 => TokenMetadata) private _tokenMetadata;
    mapping(address => bool) private _authorizedContracts;

    event MetadataSet(uint256 indexed tokenId, string name, string description, string image);
    event AttributeSet(uint256 indexed tokenId, string key, string value);
    event ContractAuthorized(address indexed contractAddress);
    event ContractDeauthorized(address indexed contractAddress);

    constructor() Ownable(msg.sender) {
        // Initialize the Ownable contract
    }

    modifier onlyAuthorized() {
        require(owner() == _msgSender() || _authorizedContracts[_msgSender()], "MetadataStorage: caller is not authorized");
        _;
    }

    function setTokenMetadata(
        uint256 tokenId,
        string memory name,
        string memory description,
        string memory image
    ) external onlyAuthorized {
        TokenMetadata storage metadata = _tokenMetadata[tokenId];
        metadata.name = name;
        metadata.description = description;
        metadata.image = image;

        emit MetadataSet(tokenId, name, description, image);
    }

    function setTokenAttribute(
        uint256 tokenId,
        string memory key,
        string memory value
    ) external onlyAuthorized {
        _tokenMetadata[tokenId].attributes[key] = value;
        emit AttributeSet(tokenId, key, value);
    }

    function getTokenMetadata(uint256 tokenId) external view returns (string memory name, string memory description, string memory image) {
        TokenMetadata storage metadata = _tokenMetadata[tokenId];
        return (metadata.name, metadata.description, metadata.image);
    }

    function getTokenAttribute(uint256 tokenId, string memory key) external view returns (string memory) {
        return _tokenMetadata[tokenId].attributes[key];
    }

    function authorizeContract(address contractAddress) external onlyOwner {
        _authorizedContracts[contractAddress] = true;
        emit ContractAuthorized(contractAddress);
    }

    function deauthorizeContract(address contractAddress) external onlyOwner {
        _authorizedContracts[contractAddress] = false;
        emit ContractDeauthorized(contractAddress);
    }

    function isContractAuthorized(address contractAddress) external view returns (bool) {
        return _authorizedContracts[contractAddress];
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        TokenMetadata storage metadata = _tokenMetadata[tokenId];
        require(bytes(metadata.name).length > 0, "MetadataStorage: URI query for nonexistent token");

        string memory json = string(abi.encodePacked(
            '{"name": "', metadata.name, '", ',
            '"description": "', metadata.description, '", ',
            '"image": "', metadata.image, '"}'
        ));

        return string(abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(bytes(json))
        ));
    }
}