import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Web3 from "web3";
import vmContract from "../bc/vending";
import { getDonutCount, getInventory } from "../hooks/useVmContract";
const Purchase = ({ setInventory, setMyDonutCount }) => {
  let web3;
  const [amount, setAmount] = useState("");
  const [wei, setWei] = useState("");
  const [connected, setConnected] = useState(false);

  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    web3.eth.getAccounts((err, accounts) => {
      if (accounts.length) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
  }
  const handlePurchase = async (e, amount) => {
    e.preventDefault();
    await web3.eth.getAccounts(async (err, accounts) => {
      await vmContract.methods.purchase(amount).send(
        {
          from: accounts[0],
          value: web3.utils.toWei(String(wei), "ether"),
        },
        (error, tranHash) => {
          setAmount("");
          setWei("");
          if (error) {
            console.log(error);
          } else {
            getInventory().then((inventory) => {
              setInventory(inventory);
            });
            getDonutCount(accounts[0]).then((donutCount) => {
              setMyDonutCount(donutCount);
            });
          }
        }
      );
    });
  };
  return (
    <form
      className="mt20 purchase-form"
      autoComplete="off"
      onSubmit={(e) => handlePurchase(e, amount)}
    >
      {connected && (
        <>
          <TextField
            onChange={(e) => {
              Number(e.target.value) ? setWei(e.target.value * 2) : setWei("");
              setAmount(e.target.value);
            }}
            value={amount}
            required
            label="How many donuts?"
            helperText="Please enter a number"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />

          <TextField
            onChange={(e) => setWei(e.target.value)}
            value={wei}
            required
            label="Payment in ethers"
            helperText="1 donut costs 2 ether"
          />
          <Button type="submit" variant="contained">
            Purhcase
          </Button>
        </>
      )}
    </form>
  );
};

export default Purchase;
