const upstateToken = artifacts.require("../contracts/UpstateToken.sol");

/*
const chai = require("./setupchai.js");
const expect = chai.expect;
*/

contract("UpstateToken Test", async (accounts) => {

    // Assign first to addresses from accounts[]
    const [deployerAccount, recipient] = accounts;

    beforeEach(async () => {
        this.upstateToken = new upstateToken(1,10);

        let uptknInstance = this.upstateToken;

        // expect(await uptknInstance.mint(deployerAccount, 100));
        await uptknInstance.mint(deployerAccount, 100);
    })

    it("send UPTKNs between accounts", async () => {
        let uptknInstance = this.upstateToken;

        // expect(await uptknInstance.transferUpstateToken(recipient, 10));

        await uptknInstance.transferUpstateToken(recipient, 10);
    })
})