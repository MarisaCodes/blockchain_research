// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Vending {
    address public owner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
        balances[address(this)] = 100;
    }

    function getVendingMachineBalance() public view returns (uint256) {
        return balances[address(this)];
    }

    function restockVendingMachine(uint256 amount) public {
        require(msg.sender == owner, "You are not the owner!");
        balances[address(this)] += amount;
    }

    function purchase(uint256 amount) public payable {
        require(
            msg.value >= amount * 2 ether,
            "You must pay at least 2 ether per donut"
        );
        require(
            amount <= balances[address(this)],
            "not enough donuts in stock"
        );

        balances[address(this)] -= amount;
        balances[msg.sender] += amount;
    }
}
