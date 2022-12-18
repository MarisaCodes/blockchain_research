// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract VendingMachine {
    address public owner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
        balances[address(this)] = 100;
    }

    function getMachineBalance() public view returns (uint256) {
        return balances[address(this)];
    }

    function restockMachine(uint256 amount) public {
        require(msg.sender == owner, "You are not the owner!");
        balances[address(this)] += amount;
    }

    function purchase(uint256 amount) public payable {
        require(
            amount <= balances[address(this)],
            "There are not enough donuts!"
        );
        require(msg.value >= amount * 2 ether, "you must pay at least 2 eth!");

        balances[address(this)] -= amount;
        balances[msg.sender] += amount;
    }
}
