import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import csv from "csv-parser";
import fs from "fs";

const values = [];
fs.createReadStream("addresses.csv")
    .pipe(csv())
    .on("data", (row) => {
        values.push([row.address, row.amount]);
    })
    .on("end", () => {
        const tree = StandardMerkleTree.of(values, ["address", "uint256"]);
        console.log("Merkle Root:", tree.root);

        fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));

        const proofs = {};

        try {
            const merkleTree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("tree.json", "utf8")));
            for (const [i, v] of merkleTree.entries()) {
                const proof = merkleTree.getProof(i);
                proofs[v[0]] = proof;
            }

            fs.writeFileSync("proofs.json", JSON.stringify(proofs, null, 2));
            console.log("Proofs have been written to 'proofs.json'.");

        } catch (err) {
            console.error("Error reading 'tree.json':", err);
        }
    })
    .on("error", (err) => {
        console.error("Error reading 'addresses.csv':", err);
    });

  // Merkle Root: 0x2901c586b45328dd13a5607de2890825bd4510e10653eaac223f8507ec6766c4
