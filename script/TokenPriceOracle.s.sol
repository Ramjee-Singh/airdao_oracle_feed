// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/TokenPriceOracle.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        TokenPriceOracle oracle = new TokenPriceOracle();
        vm.stopBroadcast();
    }
}
