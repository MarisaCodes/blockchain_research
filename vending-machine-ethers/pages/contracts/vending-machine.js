import { getProvider } from "../handlers/handleConnect";
const { ethers } = require("ethers");
const configuration = require("../../truffle/build/contracts/VendingMachine.json");
// the config from the json build has the abi and address of the contract
const vm_abi = configuration.abi;
const vm_address = configuration.networks[5777].address;
// provider
const provider = getProvider();
// vending machine contract
let vm_contract = new ethers.Contract(vm_address, vm_abi, provider);
//vm_contract = vm_contract.connect(signer);
export default vm_contract;
