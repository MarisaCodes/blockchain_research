import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import handleConnect, {
  checkEthereumObj,
  getProvider,
} from "../handlers/handleConnect";
const NavBar = () => {
  const [connected, setConnected] = useState(false);
  let ethereum;
  if (checkEthereumObj) {
    ethereum = window.ethereum;
    ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
  }
  useEffect(() => {
    if (checkEthereumObj) {
      getProvider()
        .listAccounts()
        .then((accounts) => {
          if (accounts.length) {
            setConnected(true);
          } else {
            setConnected(false);
          }
        });
    }
  }, []);
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Vending Machine</Typography>
        <Button
          onClick={handleConnect}
          sx={{ color: "white" }}
          variant={connected ? "disabled" : "contained"}
          disableElevation
        >
          Connect
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
