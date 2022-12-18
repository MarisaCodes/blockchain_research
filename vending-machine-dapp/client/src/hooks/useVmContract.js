import vmContract from "../bc/vending";
import { useEffect } from "react";
import Web3 from "web3";

export async function getInventory() {
  return await vmContract.methods.getVendingMachineBalance().call();
}
export async function getDonutCount(account) {
  return await vmContract.methods.balances(account).call();
}

const useVmContract = (setInventory,setMyDonutCount) => {
  useEffect(() => {
    getInventory().then((inventory) => {
      setInventory(inventory);
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts((err, accounts) => {
        if (!accounts.length) {
          setMyDonutCount("connect to purchase donuts!");
        } else {
          getDonutCount(accounts[0]).then((donutCount) => {
            setMyDonutCount(donutCount);
          });
        }
      });
    }
  }, []);
  if (typeof window.ethereum !== "undefined") {
    window.ethereum.on("accountsChanged", (accounts) => {
      getInventory().then((inventory) => {
        setInventory(inventory);
      });
      if (accounts.length) {
        getDonutCount(accounts[0]).then((donutCount) => {
          setMyDonutCount(donutCount);
        });
      } else {
        setMyDonutCount("connect to purchase donuts!");
      }
    });
  }
};

export default useVmContract;
