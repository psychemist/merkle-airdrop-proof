import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import csv from "csv-parser";
import fs from "fs";

const filePath = "./addresses.csv"

fs.createReadStream(filePath)
    .on('error', (err) => {
        console.error(err);
    })

    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
    })

    .on('end', () => {
        // handle end of CSV
    })

  // Merkle Root: 0x2901c586b45328dd13a5607de2890825bd4510e10653eaac223f8507ec6766c4
