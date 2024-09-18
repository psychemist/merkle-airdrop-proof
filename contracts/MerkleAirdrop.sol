// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleAirdrop is Ownable {
    bytes32 merkleRoot;
    IERC20 token;

    mapping(address => bool) claimants;

    event AirdropClaimed(address indexed claimant, uint256 amount, uint32 timestamp);

    constructor(address _tokenAddress, bytes32 _merkleRoot) Ownable(msg.sender) {
        token = IERC20(_tokenAddress);
        merkleRoot = _merkleRoot;
    }

    function claimAirdrop(
        address _claimant,
        uint256 _amount,
        bytes32[] memory _proof
    ) external {
        require(msg.sender != address(0), "Address Zero forbidden!")
        require(_claimant != address(0), "Address Zero not valid claimant!")

        require(!claimants[_claimant], "Airdrop already claimed!")
        require(_amount > 0, "Cannot claim zero tokens!")
        require(token.balanceOf(address(this)) >= _amount, "All airdrop tokens claimed!")

        // Compute leaf hash for the provided address and amount ABI encoded values
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(_claimant, _amount))));
        // Verify leaf hash using MerkleProof's verify function.
        require(MerkleProof.verify(_proof, merkleRoot, leaf), "Invalid proof submmitted");

        // Mark claimant has received tokens
        claimants[_claimant] = true;

        // Transfer airdrop tokens to claimant
        token.transfer(_claimant, _amount);

        emit AirdropClaimed(_claimant, _amount,block.timestamp);
    }

    function updateMerkleRoot(bytes32 _newMerkleRoot) external onlyOwner () {
        require(token.balanceOf(address(this)), "Airdrop tokens exhausted!");
        merkleRoot = _newMerkleRoot;
    }

    function withdraw() external onlyOwner {
        // Withdraw all airdrop tokens to contract owner's address
        require(token.transfer(_owner, token.balanceOf(address(this))), "Transfer failed");
    }
}
