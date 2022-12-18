import { useState } from "react";

const useStatus = (setError) => {
  const [connected, setConnected] = useState(false);
  const { ethereum } = window;
  if (typeof ethereum !== "undefined") {
    ethereum.request({ method: "eth_accounts" }).then((account) => {
      if (!account.length) {
        setConnected(false);
      } else {
        setConnected(true);
        setError("");
      }
    });
    ethereum.on("accountsChanged", (accounts) => {
      if (!accounts.length) {
        setConnected(false);
      } else {
        setConnected(true);
        setError("");
      }
    });
  }
  return { connected };
};

export default useStatus;
