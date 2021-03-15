const { assert, should } = require("chai");
const contributionContract = require("../build/contracts/Contribution.json");

contract("Contribution Test", async (accounts) => {
    
    it("confirms you can contribute ETH to the Contribution contract", async () => {
        // Set index zero of accounts array as deployer address
        // USE A CONTRACT ADDRESS TO BE ABLE TO MINT?
        const deployerAccount = await accounts[0];

        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const contributionInstance = await new web3.eth.Contract(
            contributionContract.abi,
            contributionContract.networks[networkId] && contributionContract.networks[networkId].address
        );

        // Mint new tokens to deployer account
        // while simultaneously confirming function transaction worked
        assert.isOk(await contributionInstance.methods.contribute().send({ from: deployerAccount, value: 1000000000000000000 }), "Unable to contribute ETH.");

        // Balance of deployer addess
        const deployerEthContribution = await contributionInstance.methods.contributedEth(deployerAccount).call({ from: deployerAccount });
        console.log(deployerEthContribution);

        // Verify recipient's address balance is more than zero
        // (convert string to integer)
        assert(deployerEthContribution > 0, "Deployer address balance of UPTKN is zero");

    })
    
})