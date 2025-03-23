require('dotenv').config();
const { Web3 } = require('web3');

if (!process.env.RPC_URL_HTTP || !process.env.CONTRACT_ADDRESS || !process.env.PRIVATE_KEY) {
    console.error("❌ Ensure RPC_URL_HTTP, CONTRACT_ADDRESS, and PRIVATE_KEY are set in the .env file");
    process.exit(1);
}

// 🔗 Use HTTP Provider for Transactions
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL_HTTP));
const contractABI = require('./TokenPriceOracleABI.json');
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

// ✅ Wallet Setup
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

console.log(`🔗 Connected as ${account.address}`);

// ✅ Function to Generate Random Price
function getRandomPrice() {
    return (Math.random() * 100).toFixed(2); // Generates a random price between 0 and 100
}

// ✅ Function to Update Price Every 5 Seconds
async function updatePriceLoop() {
    while (true) {
        try {
            const token = "BTC"; // Token Name
            const price = getRandomPrice();
            const priceInWei = web3.utils.toWei(price.toString(), 'ether'); // Convert to 18 decimals

            const tx = await contract.methods.updatePrice(token, priceInWei).send({
                from: account.address,
                gas: 300000,
                gasPrice: await web3.eth.getGasPrice()
            });

            console.log(`✅ Price Updated! Token: ${token}, New Price: ${price} ETH (Tx: ${tx.transactionHash})`);
        } catch (error) {
            console.error("❌ Error updating price:", error);
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    }
}

// ✅ Start Updating Price Every 5 Seconds
updatePriceLoop();
