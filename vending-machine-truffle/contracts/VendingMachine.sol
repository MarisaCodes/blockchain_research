// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract VendingMachine {
    address public owner;
    mapping (address => uint ) public balances;

    constructor(){
        owner = msg.sender;
        balances[address(this)] = 100;
    }
    
    function getVendingMachineBalance() public view returns (uint){
        return balances[address(this)];
    }

    function restockVendingMachine(uint amount) public {
        require(msg.sender == owner, "You are not the owner!");
        balances[address(this)] += amount;
    }

    function purchase(uint amount) public payable {
        require(msg.value >= amount * 2 ether, "You must pay at least 2 ether per donut");
        require(amount <= balances[address(this)], "not enough donuts in stock");

        uint excess = (msg.value * 1 ether - amount*2 ether) * 1 ether;
        payable(msg.sender).transfer(excess);
        balances[address(this)] -= amount;
        balances[msg.sender] += amount;
    }

}

