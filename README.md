# AirDAO Oracle Price Feed

This project implements an Oracle price feed for AirDAO, fetching real-time prices and updating smart contracts.

## 🚀 Features
- Fetches token prices and updates the smart contract.
- Listens for `PriceUpdated` events.
- Uses Foundry for smart contract development.
- Uses Node.js scripts for interaction.

---

## 📌 Prerequisites

Ensure the following are installed:
- **Node.js** (v18+ recommended) → [Download Here](https://nodejs.org/)
- **NPM** (Comes with Node.js)
- **Git** → [Download Here](https://git-scm.com/)
- **Foundry** → [Install Foundry](https://book.getfoundry.sh/getting-started/installation)
- **MSYS2** (if on Windows) → [Download Here](https://www.msys2.org/)
- **AirDAO Wallet Private Key** (for contract interactions)  https://docs.airdao.io/about-airdao/the-airdao-network

---

## 🛠 Setup Instructions

### Clone the Repository
```sh
git clone https://github.com/Ramjee-Singh/airdao_oracle_feed.git
cd airdao_oracle_feed

### Set Up Environment Variables
    Create a .env file in the root directory and add
    RPC_URL_HTTP="https://your_rpc_url"
    CONTRACT_ADDRESS="0xYourContractAddress"
    PRIVATE_KEY="your_private_key"

### Running the Project
  forge script script/TokenPriceOracle.s.sol --rpc-url $RPC_URL_HTTP --private-key $PRIVATE_KEY --broadcast
### Start the Listener (for events)
  node script/listener.js
### Start Price Updater (random price updates every 5 sec)
  node script/updateprice.js



