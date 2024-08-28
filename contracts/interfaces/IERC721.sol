// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721 {
    // Returns the number of tokens in `owner`'s account
    function balanceOf(address owner) external view returns (uint256);

    // Returns the owner of the `tokenId` token
    function ownerOf(uint256 tokenId) external view returns (address);

    // Safely transfers `tokenId` token from `from` to `to`, checking that `to` is a contract if `data` is provided
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;

    // Safely transfers `tokenId` token from `from` to `to`, ensuring that `to` is a valid address
    function safeTransferFrom(address from, address to, uint256 tokenId) external;

    // Transfers `tokenId` token from `from` to `to`
    function transferFrom(address from, address to, uint256 tokenId) external;

    // Approves `to` to manage `tokenId` token
    function approve(address to, uint256 tokenId) external;

    // Returns the approved address for `tokenId` token
    function getApproved(uint256 tokenId) external view returns (address);

    // Approves or removes `operator` as an operator for the caller
    function setApprovalForAll(address operator, bool approved) external;

    // Returns true if `operator` is allowed to manage all of `owner`'s tokens
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    // Emitted when `tokenId` token is transferred from `from` to `to`
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    // Emitted when `approved` is granted or revoked for `tokenId` token
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    // Emitted when `operator` is granted or revoked permission to manage all of `owner`'s tokens
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
}
