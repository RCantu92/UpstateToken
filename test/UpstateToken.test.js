/*
const { assert, should } = require("chai");
const upstateTokenContract = require("../build/contracts/UpstateToken.json");
const contributionContract = require("../build/contracts/Contribution.json");



contract("UpstateToken Test", async (accounts) => {

    
    beforeEach( async () => {
    })
    */

    // Test to confirm contract can mint UPTKN
    /*
    it("confirms it can mint to deployer account", async () => {
        // Set index zero of accounts array as deployer address
        const deployerAccount = await accounts[0];

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

    it("confirms you can transfer UPTKN between accounts", async () => {
        // Set index zero of accounts array as deployer address
        const deployerAccount = await accounts[0];

        // Set index one of accounts arrray as recipient address
        const recipientAccount = await accounts[1];

        // Create contract instance
        // const upstateTokenInstance = await new web3.eth.Contract(upstateTokenContract.abi);

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

        // Mint new tokens to deployer account
        // while simultaneously confirming function transaction worked
        assert.isOk(await upstateTokenInstance.methods.transferUpstateToken(recipientAccount, 10).send({ from: deployerAccount }), "No UPTKN was sent to recipient.");

        // Balance of deployer addess
        const deployerBalance = await upstateTokenInstance.methods.balanceOf(deployerAccount).call({ from: deployerAccount });
        const recipientBalance = await upstateTokenInstance.methods.balanceOf(recipientAccount).call({ from: deployerAccount });

        // Verify deployer and recipient addresses' balance are more than zero
        // (convert string to integer)
        assert(parseInt(deployerBalance) > 0, "Deployer address balance of UPTKN is zero");
        assert(parseInt(recipientBalance) > 0, "Recipient address balance of UPTKN is zero");
    });

    it("confirms UPTKN cannot be sent before _startTime", async () => {
        // Set index zero of accounts array as deployer address
        const deployerAccount = await accounts[0];

        // Set index one of accounts arrray as recipient address
        const recipientAccount = await accounts[1];

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

        try {
            await upstateTokenInstance.methods.transferUpstateToken(recipientAccount, 10).send({ from: deployerAccount });
        } catch (err) {
            console.log("The transfer window has not opened.");
        };

    })

    it("confirms UPTKN cannot be sent after _endTime", async () => {
        // Set index zero of accounts array as deployer address
        const deployerAccount = await accounts[0];

        // Set index one of accounts arrray as recipient address
        const recipientAccount = await accounts[1];

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

        try {
            await upstateTokenInstance.methods.transferUpstateToken(recipientAccount, 10).send({ from: deployerAccount });
        } catch (err) {
            console.log("The transfer window has closed.");
        };

    })
    */

})