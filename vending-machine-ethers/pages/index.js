import { Box, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import PurchaseForm from "./components/PurchaseForm";
import { checkEthereumObj, getProvider } from "./handlers/handleConnect";
import vm_contract from "./contracts/vending-machine";
import { useState } from "react";

const paperStyles = {
  margin: "5px 0px 20px 0px",
  padding: "5px",
  minWidth: "100px",
  width: "fit-content",
};

const VendingMachine = () => {
  const [machineBalance, setMachineBalance] = useState(
    "switch to correct network to view"
  );
  const [userBalance, setUserBalance] = useState(
    "connect or switch to correct network to view"
  );

  if (checkEthereumObj) {
    getProvider()._networkPromise.then((result) => {
      if (result.chainId === 1337) {
        vm_contract.getMachineBalance().then((balance) => {
          setMachineBalance(balance.toNumber());
        });
        getProvider()
          .listAccounts()
          .then((accounts) => {
            if (accounts.length) {
              vm_contract.balances(accounts[0]).then((balance) => {
                setUserBalance(balance.toNumber());
              });
            }
          });
      }
    });
  }
  return (
    <Container>
      <Box sx={{ marginTop: "15px" }}>
        <Paper sx={paperStyles} elevation={3}>
          <Typography component="div" color="purple">
            Available donuts:{" "}
            <Typography component="span">{machineBalance}</Typography>
          </Typography>
        </Paper>
        <Paper elevation={3} sx={paperStyles}>
          <Typography component="div" color="purple">
            Your donuts: <Typography component="span">{userBalance}</Typography>
          </Typography>
        </Paper>
      </Box>
      <PurchaseForm />
    </Container>
  );
};

export default VendingMachine;
