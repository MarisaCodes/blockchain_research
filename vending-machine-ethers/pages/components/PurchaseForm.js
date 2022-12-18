import { FormLabel, TextField, Button } from "@mui/material";
import { useState } from "react";
import vm_contract from "../contracts/vending-machine";
import { ethers } from "ethers";
import { getProvider } from "../handlers/handleConnect";
const PurchaseForm = () => {
  const [amount, setAmount] = useState("");
  const [eth, setEth] = useState("");

  const handlePurchase = (e) => {
    e.preventDefault();

    vm_contract = vm_contract.connect(getProvider().getSigner());
    vm_contract
      .purchase(amount, {
        value: ethers.utils.parseEther(String(eth)),
      })
      .then(() => {
        vm_contract.getMachineBalance().then();
        getProvider()
          .listAccounts()
          .then((accounts) => {
            vm_contract.balances(accounts[0]).then((balance) => {
              setUserBalance(balance.toNumber());
            });
          });
      });
  };
  return (
    <div>
      <FormLabel>Purchase some donuts from the vending machine!</FormLabel>
      <form
        className="purchase-form"
        autoComplete="off"
        onSubmit={(e) => handlePurchase(e)}
      >
        <TextField
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          color="primary"
          variant="outlined"
          label="Number of donuts"
          required
          helperText="enter number of donuts you want to buy"
          onChange={(e) => {
            setAmount(e.target.value);
            setEth(e.target.value * 2);
          }}
          value={amount}
        />
        <TextField
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          color="primary"
          variant="outlined"
          label="cost (ether)"
          required
          helperText="1 donut costs 2 ether"
          value={eth}
        />
        <Button type="submit" variant="contained">
          Purchase
        </Button>
      </form>
    </div>
  );
};

export default PurchaseForm;
