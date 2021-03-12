const { assert } = require("chai");
const upstateTokenContract = require("../build/contracts/UpstateToken.json");


contract("UpstateToken Test", async (accounts) => {

    // Test to confirm contract can mint UPTKN
    it("confirms it can mint to deployer account", async () => {
        // Set index zero of accounts array as deployer address
        let deployerAccount = await accounts[0];

        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const upstateTokenInstance = await new web3.eth.Contract(
            upstateTokenContract.abi,
            upstateTokenContract.networks[networkId] && upstateTokenContract.networks[networkId].address
        );

        // Mint new tokens to deployer account
        // while simultaneously confirming function transaction worked
        assert.isOk(await upstateTokenInstance.methods.mint(deployerAccount, 100).send({ from: deployerAccount }), "Contract did not mint UPTKN");

        // Balance of deployer addess
        const deployerBalance = await upstateTokenInstance.methods.balanceOf(deployerAccount).call({ from: deployerAccount });

        // Verify deployer address' balance is more than zero
        // (convert string to integer)
        assert(parseInt(deployerBalance) > 0, "Deployer address balance of UPTKN is zero");
    });

});