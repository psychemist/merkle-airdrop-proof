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
        try {
            const tree = StandardMerkleTree.of(leaves, ["address", "uint256"]);
            fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
            console.log("Merkle Root:", tree.root);

            const merkleTree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("tree.json", "utf8")))
            const proofs = {};

            for (const [i, v] of merkleTree.entries()) {
                const proof = merkleTree.getProof(i);
                proofs[v[0]] = proof;
            }

            fs.writeFileSync("proofs.json", JSON.stringify(proofs, null, 2), "utf8");
            console.log("Proofs saved successfully");
        } catch (err) {
            console.log("Proofs could not be generated: " + err);
        }
    })
    .on("error", (err) => {
        console.log("Error reading addresses.csv: " + err);
    })


  // Merkle Root: 0x2901c586b45328dd13a5607de2890825bd4510e10653eaac223f8507ec6766c4
