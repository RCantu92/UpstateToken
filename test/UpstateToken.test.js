const { assert } = require("chai");
const BigNumber = require("bignumber.js");
const { expectRevert } = require("@openzeppelin/test-helpers");

const upstateTokenContract = require("../build/contracts/UpstateToken.json");

contract("UpstateToken Test", async (accounts) => {

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
        // (initial supply is based on current circulating ETH, so 1 UPTKN = 1 ETH)
        // _startTime = block number 10, _endTime = block number 2000
        const initialSupply = new BigNumber(115077231000000000000000000);
        const deployedUpstateContract = await upstateTokenInstance
            .deploy({ data: upstateTokenContract.bytecode, arguments: [10, 2000, initialSupply] })
            .send({ from: deployerAccount, gas: 2100000 });

        // Contribute 1 ETH to UpstateToken contract
        const uptknDeployerAmount = new BigNumber(1000000000000000000);
        assert.isOk(await deployedUpstateContract.methods.ethToUptknContribution(deployerAccount, uptknDeployerAmount)
            .send({from : deployerAccount }));

        // UPTKN balance of deployer address
        const deployerBalance = await deployedUpstateContract.methods.balanceOf(deployerAccount)
            .call({ from: deployerAccount });

        // Confirm deployer's UPTKN balance is as expected
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
        // (initial supply is based on current circulating ETH, so 1 UPTKN = 1 ETH)
        // _startTime = block number 10, _endTime = block number 2000
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
        // (initial supply is based on current circulating ETH, so 1 UPTKN = 1 ETH)
        // _startTime = block number 2000, _endTime = block number 3000
        const initialSupply = new BigNumber(115077231000000000000000000);
        const deployedUpstateContract = await upstateTokenInstance
            .deploy({ data: upstateTokenContract.bytecode, arguments: [2000, 3000, initialSupply] })
            .send({ from: deployerAccount, gas: 2100000 });

        // Contribute 5 ETH to UpstateToken contract
        // (Transaction should fail, as it is before _startTime)
        const uptknDeployerAmount = new BigNumber(5000000000000000000);
        await expectRevert(
            deployedUpstateContract.methods.ethToUptknContribution(deployerAccount, uptknDeployerAmount)
                .send({from : deployerAccount }),
            "The transfer window has not opened."
        );

        // Transfer 2 UPTKN from deployer account to recipient account
        // (Transaction should fail, as it is before _startTime)
        const uptknRecipientAmount = new BigNumber(2000000000000000000);
        await expectRevert(
            deployedUpstateContract.methods.transferUpstateToken(recipientAccount, uptknRecipientAmount)
                .send({from : deployerAccount }),
            "The transfer window has not opened."
        );

    })

    it("confirms UPTKN cannot be sent after _endTime", async () => {
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
        // (initial supply is based on current circulating ETH, so 1 UPTKN = 1 ETH)
        // _startTime = block number 10, _endTime = block number 50
        const initialSupply = new BigNumber(115077231000000000000000000);
        const deployedUpstateContract = await upstateTokenInstance
            .deploy({ data: upstateTokenContract.bytecode, arguments: [10, 50, initialSupply] })
            .send({ from: deployerAccount, gas: 2100000 });

        // Contribute 5 ETH to UpstateToken contract
        // (Transaction should fail, as it is before _endTime)
        const uptknDeployerAmount = new BigNumber(5000000000000000000);
        await expectRevert(
            deployedUpstateContract.methods.ethToUptknContribution(deployerAccount, uptknDeployerAmount)
                .send({from : deployerAccount }),
            "The transfer window has closed."
        );

        // Transfer 2 UPTKN from deployer account to recipient account
        // (Transaction should fail, as it is after _endTime)
        const uptknRecipientAmount = new BigNumber(2000000000000000000);
        await expectRevert(
            deployedUpstateContract.methods.transferUpstateToken(recipientAccount, uptknRecipientAmount)
                .send({from : deployerAccount }),
            "The transfer window has closed."
        );

    })

})