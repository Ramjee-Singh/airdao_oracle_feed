require('dotenv').config();
const { Web3 } = require('web3');

if (!process.env.RPC_URL || !process.env.CONTRACT_ADDRESS) {
    console.error("❌ Ensure RPC_URL and CONTRACT_ADDRESS are set in the .env file");
    process.exit(1);
}

console.log(`🔗 Connecting to HTTP RPC: ${process.env.RPC_URL}`);
const web3 = new Web3(process.env.RPC_URL); // No WebsocketProvider, only HTTP

// ✅ Smart contract details
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require('./TokenPriceOracleABI.json');

// ✅ Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);
console.log(`📡 Polling for PriceUpdated events on contract: ${contractAddress}`);

let lastCheckedBlock = 0;

// ✅ Function to poll for new events every 10 seconds
async function pollEvents() {
    try {
        const latestBlock = Number(await web3.eth.getBlockNumber()); // Convert BigInt to Number

        if (lastCheckedBlock === 0) {
            lastCheckedBlock = latestBlock - 10; // Check last 10 blocks initially
        }

        const events = await contract.getPastEvents('PriceUpdated', {
            fromBlock: lastCheckedBlock + 1,
            toBlock: 'latest'
        });

        for (const event of events) {
            console.log(`🔔 Price Updated! Token: ${event.returnValues.token}, New Price: ${event.returnValues.price}`);
        }

        lastCheckedBlock = latestBlock; // Update last checked block

    } catch (error) {
        console.error("❌ Error fetching events:", error);
    }

    setTimeout(pollEvents, 10000); // Poll every 10 seconds
}


// Start polling
pollEvents();
