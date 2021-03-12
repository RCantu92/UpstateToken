const upstateTokenContract = require("../build/contracts/UpstateToken.json");

contract("UpstateToken Test", async (accounts) => {

    // Assign first to addresses from accounts[]
    const [deployerAccount, recipient] = accounts;


    /*
    beforeEach( async () => {

        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const upstateTokenInstance = await new web3.eth.Contract(
            upstateTokenContract.abi,
            upstateTokenContract.networks[networkId] && upstateTokenContract.networks[networkId].address
        );

        // Deploy Contract
        
    });
    */

    it("confirms it can mint to deployer account", async () => {
        // Get networkId
        const networkId = await web3.eth.net.getId();

        // Create contract instance
        const upstateTokenInstance = await new web3.eth.Contract(
            upstateTokenContract.abi,
            upstateTokenContract.networks[networkId] && upstateTokenContract.networks[networkId].address
        );

        // Mint new tokens to deployer account
        await upstateTokenInstance.methods.mint(deployerAccount, 100).send({ from: deployerAccount });

        // Balance of deployer Address
        const deployerBalance = await upstateTokenInstance.methods.balanceOf(deployerAccount).call({ from: deployerAccount });

        // Verify deployer address' balance is more than zero
        require(deployerBalance.value > 0, "Deployer UPTKN balance is 0");
    });

});