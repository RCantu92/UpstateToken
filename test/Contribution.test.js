const { assert } = require("chai");
const contributionContract = require("../build/contracts/Contribution.json");

contract("Contribution Test", async (accounts) => {
    
    it("confirms you can contribute ETH to the Contribution contract", async () => {
        // Set index zero of accounts array as the first address
        const firstAccount = await accounts[0];

        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const contributionInstance = await new web3.eth.Contract(
            contributionContract.abi,
            contributionContract.networks[networkId] && contributionContract.networks[networkId].address
        );

        // Contribute 1 ETH from first account
        // while simultaneously confirming function transaction worked
        assert.isOk(await contributionInstance.methods.contribute()
        .send({ from: firstAccount, value: 1000000000000000000, gas: 2100000 }), "Unable to contribute ETH.");

        // Balance of deployer addess
        const firstAccountEthContribution = await contributionInstance.methods.contributedEth(firstAccount)
        .call({ from: firstAccount });

        // Verify recipient's address balance is more than zero
        assert(firstAccountEthContribution > 0, "First account address balance of ETH is zero.");

    })

    it("confirms you can receive UPTKN for your ETH contribution", async () => {
        // Set index two of accounts array as contributor address
        const contributorAccount = await accounts[2];

        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const contributionInstance = await new web3.eth.Contract(
            contributionContract.abi,
            contributionContract.networks[networkId] && contributionContract.networks[networkId].address
        );

        // Contribute 1 ETH from contributor account
        // while simultaneously confirming function transaction worked
        assert.isOk(await contributionInstance.methods.contribute()
        .send({ from: contributorAccount, value: 1000000000000000000, gas: 2100000 }), "Unable to contribute ETH.");

        // Balance of contributor account addess
        const contributorUptknAmount = await contributionInstance.methods.balanceOf(contributorAccount)
        .call({ from: contributorAccount });

        // Verify contributor's address UPTKN balance is more than zero
        assert(contributorUptknAmount > 0, "Contributor address balance of UPTKN is zero.");

    })

})