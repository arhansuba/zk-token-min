// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomToken is ERC20, ERC20Burnable, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address tokenOwner
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(tokenOwner, initialSupply);
        transferOwnership(tokenOwner);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

contract TokenFactory {
    event TokenCreated(address indexed creator, address tokenAddress, string name, string symbol);

    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public returns (address) {
        CustomToken newToken = new CustomToken(
            name,
            symbol,
            initialSupply,
            msg.sender
        );
        
        emit TokenCreated(msg.sender, address(newToken), name, symbol);
        return address(newToken);
    }
}