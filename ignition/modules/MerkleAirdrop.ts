import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x802Cd92D3777E6865017A250B33DDD61F94c1f24";
const merkleRoot = "0x2901c586b45328dd13a5607de2890825bd4510e10653eaac223f8507ec6766c4";

const MerkleAirdrop = buildModule("MerkleAirdropModule", (m) => {

    const merkleAirdrop = m.contract("MerkleAirdrop", [tokenAddress, merkleRoot]);

    return { merkleAirdrop };
});

export default MerkleAirdrop;


// Deployed MerkleAirdrop
