// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;
  address[] wavers;

  constructor() {
    console.log("Here's my first smart contract using Solidity!");
  }

  function wave() public {
    totalWaves += 1;
    pushWaver(msg.sender);
    console.log("%s has waved!", msg.sender);
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }

  // Retrieve a specific element from the wavers array based on its position.
  function getWaver(uint elementIndex) public returns(address) {
    return wavers[elementIndex];
  }

  // Retrieve the number of wavers
  function getNoWavers() public returns(uint) {
    return wavers.length;
  }

  // Append to the array of those who have waved
  // This will increase the array length by 1.
  function pushWaver(address elementValue) public {
    wavers.push(elementValue);
  }
}