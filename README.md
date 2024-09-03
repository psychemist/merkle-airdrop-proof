# Merkle Airdrop Proof Implementation

This project demonstrates the creation of a Merkle tree-based airdrop system using Solidity and Hardhat.

## Generating Proofs

1. Begin by installing the necessary dependencies:

   ```bash
   npm install csv-parser keccak256 merkletreejs 
   ```

2. Create your addresses.csv file in the following structure:

    ```csv
    address,amount
    0x123...abc,100
    0x456...def,200
    ```

3. Execute the script with:

    ```bash
    node merkle.js
    ```

4. Upon execution, the script will display the Merkle root and produce a `proofs.json` file.

## Deploying Contract

1. Set up your Hardhat environment and configure your network settings.

2. Deploy the contract by running

    ```bash
    npx hardhat run scripts/deploy.js --network network-name
    ```

    Replace `network-name` with the network you are deploying to (e.g., localhost, sepolia, lisk, base, etc.).

3. Ensure the deployment script passes the ERC20 token address and the Merkle root during deployment.

## Validating Proofs

- The merkle.js script generates a proofs.json file, containing the proofs needed for each address.  
- To claim tokens, users will require their address, the amount, and the relevant proof from the proofs.json file.  
- An example claim function call:

    ```javascript
    await MerkleAirdrop.claimAirdrop(amount, proof);
    ```

<!-- ## Running Tests

Run the tests using:
    ```bash
    npx hardhat test
    ``` -->

## Limitations and Assumptions

- Ensure that the Merkle root is generated from a reliable and trusted data source.
- The CSV file is assumed to be correctly formatted and to contain valid Ethereum addresses.
- The contract owner is responsible for ensuring the contract is funded with sufficient tokens before claims can be made.
