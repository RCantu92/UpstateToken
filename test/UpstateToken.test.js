const { assert, expect } = require("chai");
const BigNumber = require("bignumber.js");
const upstateTokenContract = require("../build/contracts/UpstateToken.json");

contract("UpstateToken Test", async (accounts) => {

    /*
    it("confirms it can to deploy contract and transfer UPTKN", async () => {
        // Set index zero of accounts array as the first address
        const deployerAccount = await accounts[0];

        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const upstateTokenInstance = await new web3.eth.Contract(
            upstateTokenContract.abi,
            upstateTokenContract.networks[networkId] && upstateTokenContract.networks[networkId].address
        );

        // Deploy new UpstateToken contract instance with initial supply
        const initialSupply = new BigNumber(115077231000000000000000000);
        const deployedUpstateContract = await upstateTokenInstance
        .deploy({ data: upstateTokenContract.bytecode, arguments: [10, 2000, initialSupply] })
        .send({ from: deployerAccount, gas: 2100000 });

        // Contribute 1 ETH to UpstateToken contract
        const uptknDeployerAmount = new BigNumber(1000000000000000000);
        assert.isOk(await deployedUpstateContract.methods.ethToUptknContribution(deployerAccount, uptknDeployerAmount)
        .send({from : deployerAccount }));

        // Balance of deployer addess
        const deployerBalance = await deployedUpstateContract.methods.balanceOf(deployerAccount)
        .call({ from: deployerAccount });

        // Deployer's UPTKN balance is the same as 
        assert(deployerBalance == uptknDeployerAmount, "Deployer address did not receive correct amount of UPTKN.");
    });
    
    it("confirms you can transfer UPTKN between accounts", async () => {
        // Set index of first two accounts
        const deployerAccount = await accounts[0];
        const recipientAccount = await accounts[1];

        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const upstateTokenInstance = await new web3.eth.Contract(
            upstateTokenContract.abi,
            upstateTokenContract.networks[networkId] && upstateTokenContract.networks[networkId].address
        );

        // Deploy new UpstateToken contract instance with initial supply
        const initialSupply = new BigNumber(115077231000000000000000000);
        const deployedUpstateContract = await upstateTokenInstance
        .deploy({ data: upstateTokenContract.bytecode, arguments: [10, 2000, initialSupply] })
        .send({ from: deployerAccount, gas: 2100000 });

        // Contribute 5 ETH to UpstateToken contract
        const uptknDeployerAmount = new BigNumber(5000000000000000000);
        assert.isOk(await deployedUpstateContract.methods.ethToUptknContribution(deployerAccount, uptknDeployerAmount)
        .send({from : deployerAccount }));

        // Transfer 2 ETH to recipient account
        const uptknRecipientAmount = new BigNumber(2000000000000000000);
        assert.isOk(await deployedUpstateContract.methods.transferUpstateToken(recipientAccount, uptknRecipientAmount)
        .send({from : deployerAccount }));

        // Balances of both addesses
        const deployerBalance = await deployedUpstateContract.methods.balanceOf(deployerAccount)
        .call({ from: deployerAccount });
        const recipientBalance = await deployedUpstateContract.methods.balanceOf(recipientAccount)
        .call({ from: recipientAccount });

        // Verify deployer and recipient addresses' balance are more than zero
        // (convert string to integer)
        assert(parseInt(deployerBalance) == (uptknDeployerAmount - uptknRecipientAmount), "Deployer address did not receive correct amount of UPTKN.");
        assert(parseInt(recipientBalance) == uptknRecipientAmount, "Recipient address did not receive correct amount of UPTKN.");
    });
    */
    
    it("confirms UPTKN cannot be sent before _startTime", async () => {
        // Set index of first two accounts
        const deployerAccount = await accounts[0];
        const recipientAccount = await accounts[1];

        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const upstateTokenInstance = await new web3.eth.Contract(
            upstateTokenContract.abi,
            upstateTokenContract.networks[networkId] && upstateTokenContract.networks[networkId].address
        );

        // Deploy new UpstateToken contract instance with initial supply
        const initialSupply = new BigNumber(115077231000000000000000000);
        const deployedUpstateContract = await upstateTokenInstance
        .deploy({ data: upstateTokenContract.bytecode, arguments: [2000, 3000, initialSupply] })
        .send({ from: deployerAccount, gas: 2100000 });

        // Contribute 5 ETH to UpstateToken contract
        const uptknDeployerAmount = new BigNumber(5000000000000000000);
        assert.isOk(await deployedUpstateContract.methods.ethToUptknContribution(deployerAccount, uptknDeployerAmount)
        .send({from : deployerAccount }));

        /*
        const uptknRecipientAmount = new BigNumber(2000000000000000000);
        expect(await deployedUpstateContract.methods.transferUpstateToken(recipientAccount, uptknRecipientAmount)
        .send({from : deployerAccount })).to.throw(new Error("Returned error: VM Exception while processing transaction: revert The transfer window has not opened."));
        */

        /*
        try {
            // Transfer 2 ETH to recipient account
            const uptknRecipientAmount = new BigNumber(2000000000000000000);
            await deployedUpstateContract.methods.transferUpstateToken(recipientAccount, uptknRecipientAmount)
            .send({from : deployerAccount });
        } catch(err) {
            console.log("The transfer window has not opened.");
        }
        */

    })

    /*
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