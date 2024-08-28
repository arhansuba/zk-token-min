// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TokenMinter is ERC20, ERC20Burnable, Pausable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    uint256 public mintingCap;

    event MintingCapUpdated(uint256 newCap);

    constructor(string memory name, string memory symbol, uint256 _mintingCap) ERC20(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        mintingCap = _mintingCap;
    }

    function setMintingCap(uint256 _newCap) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_newCap >= totalSupply(), "New cap must be greater than or equal to current total supply");
        mintingCap = _newCap;
        emit MintingCapUpdated(_newCap);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) whenNotPaused {
        require(totalSupply() + amount <= mintingCap, "Minting cap exceeded");
        _mint(to, amount);
    }

    function burn(uint256 amount) public virtual override whenNotPaused {
        super.burn(amount);
    }

    function burnFrom(address account, uint256 amount) public virtual override whenNotPaused {
        super.burnFrom(account, amount);
    }

    function transfer(address recipient, uint256 amount) public virtual override whenNotPaused returns (bool) {
        return super.transfer(recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override whenNotPaused returns (bool) {
        return super.transferFrom(sender, recipient, amount);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function grantMinterRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MINTER_ROLE, account);
    }

    function revokeMinterRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(MINTER_ROLE, account);
    }

    function grantPauserRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(PAUSER_ROLE, account);
    }

    function revokePauserRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(PAUSER_ROLE, account);
    }
}