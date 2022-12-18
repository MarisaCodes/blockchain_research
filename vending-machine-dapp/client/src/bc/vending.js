import Web3 from "web3";
import configuration from "./build/Vending.json";

const web3 = new Web3("HTTP://127.0.0.1:7545");

const contract_abi = configuration.abi;
const contract_address = configuration.networks[5777].address;

const vmContract = new web3.eth.Contract(contract_abi, contract_address);

export default vmContract;
