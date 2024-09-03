// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Lizk is ERC20 {
    address private _owner;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 supply_,
        address account_
    ) ERC20(name_, symbol_) {
        _owner = msg.sender;
        _mint(account_, supply_);
    }

    function mintMoreTokens(uint256 _amount) external {
        require(msg.sender == _owner, "Only owner can mint more tokens!");
        _mint(_owner, _amount);
    }

    // function getTokens(uint256 _amount) external {
    //     require(msg.sender != address(0), "Address Zero cannot withdraw tokens!");
    //     require(_amount > 0, "Cannot stake zero tokens!");
    //     require(token.balanceOf(msg.sender) > 0, "Insufficient funds");

    //     transfer
    // }
}
