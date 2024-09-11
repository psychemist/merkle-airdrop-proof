import { ethers } from "ethers";


// Replace with your Infura URL or another provider
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);

const senderPrivateKey = "PRIVATE_KEY"; // Replace with sender's private key
const recipientAddress = "0x"; // Replace with the recipient's address

const wallet = new ethers.Wallet(senderPrivateKey, provider);

async function transferETH() {
    const amountInEther = "0.1"; // Amount to send (in ETH)

    const tx = {
        to: recipientAddress,
        value: ethers.parseEther(amountInEther),
    };

    const transaction = await wallet.sendTransaction(tx);
    console.log("Transaction hash:", transaction.hash);

    await transaction.wait();
    console.log("Transaction confirmed");
}

transferETH()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });