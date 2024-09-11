import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import csv from "csv-parser";
import fs from "fs";
import { constants } from "fs/promises";
import keccak256 from "keccak256";

const filePath = "./addresses.csv";
const leaves = [];

fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
        const userData = [row.address, row.amount];
        leaves.push(userData);
    })
    .on("end", () => {
        const tree = StandardMerkleTree.of(leaves, ["address", "uint256"]);
        fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
        console.log("Merkle Root:", tree.root);

        const proofs = [];
        const merkleTree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("tree.json", "utf8")))

        for (const [i, v] of merkleTree.entries()) {
            const proof = merkleTree.getProof(i);
            proofs.push({ [v]: proof });
        }

        fs.writeFileSync("proofs.json", JSON.stringify(proofs), "utf-8");
        console.log("All proofs saved successfully");
    })
    .on("error", (err) => {
        console.error(err);
    })


  // Merkle Root: 0x2901c586b45328dd13a5607de2890825bd4510e10653eaac223f8507ec6766c4
