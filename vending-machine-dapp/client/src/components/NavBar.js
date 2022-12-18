import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useStatus from "../hooks/useStatus";
import { Alert } from "@mui/material";
import { useState } from "react";

const NavBar = () => {
  const { ethereum } = window;

  const [error, setError] = useState("");
  const { connected } = useStatus(setError);
  const connectClickHandler = async () => {
    if (!connected && typeof window.ethereum !== "undefined") {
      ethereum.request({ method: "eth_requestAccounts" }).catch((err) => {
        setError(err.message);
      });
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vending Machine
          </Typography>
          <Button
            variant={connected ? "disabled" : "inherit"}
            onClick={connectClickHandler}
          >
            connect wallet
          </Button>
        </Toolbar>
      </AppBar>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};
export default NavBar;
