import { Container, StyledEngineProvider } from "@mui/system";
import NavBar from "./components/NavBar";
import Inventory from "./components/Inventory";
import Purchase from "./components/Purchase";
import useVmContract from "./hooks/useVmContract";
import { useState } from "react";

function App() {
  const [myDonutCount, setMyDonutCount] = useState("loading...");
  const [inventory, setInventory] = useState("loading...");

  useVmContract(setInventory, setMyDonutCount);

  return (
    <div className="App">
      <NavBar />
      <StyledEngineProvider>
        <Container>
          <Inventory text="Vending Machine Inventory:" inventory={inventory} />

          <Inventory text="My donuts:" inventory={myDonutCount} />

          <Purchase
            setInventory={setInventory}
            setMyDonutCount={setMyDonutCount}
          />
        </Container>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
