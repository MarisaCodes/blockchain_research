const Vending = artifacts.require("Vending");

module.exports = (deployer) => {
  deployer.deploy(Vending);
};
