const upstateToken = artifacts.require("UpstateToken");

// Function to deploy
module.exports = async function(deployer) {
    await deployer.deploy(upstateToken, 10, 100);
}