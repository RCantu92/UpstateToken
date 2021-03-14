const upstateToken = artifacts.require("UpstateToken");
const contribution = artifacts.require("Contribution");

// Function to deploy
module.exports = async function(deployer) {
    await deployer.deploy(contribution, 10, 50);
    // await deployer.deploy(upstateToken, 10, 50);
}