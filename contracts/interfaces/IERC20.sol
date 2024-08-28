// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    // Returns the total supply of tokens
    function totalSupply() external view returns (uint256);

    // Returns the balance of `account`
    function balanceOf(address account) external view returns (uint256);

    // Transfers `amount` tokens from the caller's account to `recipient`
    function transfer(address recipient, uint256 amount) external returns (bool);

    // Returns the remaining number of tokens that `spender` is allowed to spend on behalf of `owner`
    function allowance(address owner, address spender) external view returns (uint256);

    // Approves `spender` to spend `amount` tokens on behalf of the caller
    function approve(address spender, uint256 amount) external returns (bool);

    // Transfers `amount` tokens from `sender` to `recipient`
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    // Emitted when `value` tokens are moved from one account (`from`) to another (`to`)
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Emitted when the allowance of a `spender` for an `owner` is set by a call to `approve`
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
