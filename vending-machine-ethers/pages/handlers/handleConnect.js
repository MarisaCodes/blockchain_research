import { ethers } from "ethers";
// rather than using if() everywhere, check ethereum object to return boolean
export const checkEthereumObj =
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";

export function getProvider() {
  if (checkEthereumObj) {
    const { ethereum } = window;
    return new ethers.providers.Web3Provider(ethereum);
  }
}

// handles connection to metamask wallet
async function handleConnect() {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
}
export default handleConnect;
