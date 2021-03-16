const BigNumber = require("bignumber.js");
const contribution = artifacts.require("Contribution");

// Function to deploy
module.exports = async function(deployer) {
    const initialSupply = new BigNumber(115063823000000000000000000);
    await deployer.deploy(contribution, 10, 800, initialSupply);
}