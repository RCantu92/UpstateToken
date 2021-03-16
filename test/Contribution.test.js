const { assert, should } = require("chai");
const contributionContract = require("../build/contracts/Contribution.json");

contract("Contribution Test", async (accounts) => {
    
    /*
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
        assert(deployerEthContribution > 0, "Deployer address balance of ETH is zero.");

    })
    */
    
    it("confirms Contribution contract can hold UPTKN", async () => {
        // Set index zero of accounts array as default address
        const firstAccount = await accounts[0];

        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const contributionInstance = await new web3.eth.Contract(
            contributionContract.abi,
            contributionContract.networks[networkId] && contributionContract.networks[networkId].address
        );

        // DELETE LATER
        const uptknTotalSupply = await contributionInstance.methods.totalSupply().call({ from: firstAccount  });

        // UPTKN Balance of contract addess
        const contractUptknAmount = await contributionInstance.methods.balanceOf("0x1B6051C608bB7f35E6a0eb2B1B9009d3Ef3aF14d").call({ from: firstAccount });

        // Verify contract's UPTKN balance is same as UPTKN total supply
        assert(contractUptknAmount == uptknTotalSupply, "Contract's UPTKN balance is not equal to UPTKN total supply.");

    })

    /*
    it("confirms you can receive UPTKN for your ETH contribution", async () => {
        // Set index zero of accounts array as deployer address
        // USE A CONTRACT ADDRESS TO BE ABLE TO MINT?
        const contributorAccount = await accounts[1];

        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const contributionInstance = await new web3.eth.Contract(
            contributionContract.abi,
            contributionContract.networks[networkId] && contributionContract.networks[networkId].address
        );

        // DELETE LATER
        // console.log(await contributionInstance.methods.totalSupply().call({ from: contributorAccount }));

        // Mint new tokens to deployer account
        // while simultaneously confirming function transaction worked
        // assert.isOk(await contributionInstance.methods.contribute().send({ from: contributorAccount, value: 1000000000000000000 }), "Unable to contribute ETH.");

        // Balance of contract addess
        const contractUptknAmount = await contributionInstance.methods.balanceOf("0x1B6051C608bB7f35E6a0eb2B1B9009d3Ef3aF14d").call({ from: contributorAccount });
        console.log(contractUptknAmount);

        // Balance of deployer addess
        // const contributorUptknAmount = await contributionInstance.methods.balanceOf(contributorAccount).call({ from: contributorAccount });
        // console.log(contributorUptknAmount);

        // Verify recipient's address balance is more than zero
        // (convert string to integer)
        // assert(contributorUptknAmount > 0, "Contributor address balance of UPTKN is zero.");

    })
    */

})