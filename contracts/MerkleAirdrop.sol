// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MerkleAirdrop is Ownable {
    bytes32 public merkleRoot;
    IERC20 public token;

    mapping(address => bool) public validClaims;

    event AirdropClaimedSuccessfuly(address indexed claimant, uint256 amount);

    constructor(address _token, bytes32 _merkleRoot) Ownable(msg.sender) {
        token = IERC20(_token);
        merkleRoot = _merkleRoot;
    }

    function claimAirdrop(bytes32[] memory _proof, uint _amount) external {
        require(!validClaims[msg.sender], "Address has claimed airdrop!");

        bytes32 leaf = keccak256(
            bytes.concat(keccak256(abi.encode(msg.sender, _amount)))
        );

        require(
            MerkleProof.verify(_proof, merkleRoot, leaf),
            "Proof not valid!"
        );

        // Add address to claimants' mapping before sending tokens to prevent reentrancy
        validClaims[msg.sender] = true;

        IERC20(token).transfer(msg.sender, _amount);
        emit AirdropClaimedSuccessfuly(msg.sender, _amount);
    }

    function withdrawAllTokens() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Token transfer failed1");
    }
}
