// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TokenPriceOracle {
    address public owner;
    mapping(string => uint256) public tokenPrices; // Prices stored in 18 decimals

    event PriceUpdated(string indexed token, uint256 price);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Update token price (called from an off-chain script)
    function updatePrice(string memory _token, uint256 _price) external onlyOwner {
        tokenPrices[_token] = _price;
        emit PriceUpdated(_token, _price);
    }

    // Retrieve token price
    function getPrice(string memory _token) external view returns (uint256) {
        return tokenPrices[_token];
    }
}
