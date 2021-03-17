# UpstateToken (UPTKN) - ERC20
UpstateToken, UPTKN, is a new ERC20 token being built. It has the functionality of the OpenZeppelin ERC20 standard, with some added functionality. The additional functionality limits when the token can be transferred. This allowable transfer window is based on block numbers, currently on a Ganache local instance, but sone on the Ethereum Kovan testnet.

## Testing:

Current tests are as follows:

* Confirming the UpstateToken contract can be deployed and transfer UPTKN.

* Confirms UPTKN is transferable between accounts.

* Confirms UPTKN cannot be transferred outside of the transfer window. Whether before or after.

* Confirms Contribution contract can receive ETH.

* Confirms Contribution contract can distribute UPTKN based on ETH contribution.

## Next Steps:

* Deploy on Ethereum Kovan testnet.

### Notes:

* The *transferUpstateToken()* function had its visibility changed from *internal* to *public* to be able to be called from the test file.

* *_startTime* and *_endTime* parameters are based on a local instance of a Ganache blockchain.