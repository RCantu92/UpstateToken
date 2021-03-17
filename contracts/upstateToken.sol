// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@OpenZeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Upstate Token, ERC20 token with transfer
 * functionality based on provided time window, based on blocks.
 * @author Roberto Cantu
 * @notice Creates new token, UPTKN, that can only be transfered
 * within provided block-based time window.
 * @dev Uses ERC20 functionality from OpenZeppelin.
 */
contract UpstateToken is ERC20 {
    
    uint public startTime;
    uint public endTime;
    
    modifier withinTransferWindow() {
        require(startTime < block.number, "The transfer window has not opened.");
        require(block.number < endTime, "The transfer window has closed.");
        _;
    }

    /**
     * @notice Creates new ERC20 UpstateToken (UPTKN) as well as
     * sets time window, which would restrict token's transferability.
     * @dev Hard-codes name and symbol of ERC20 to ERC20.contructor,
     * and sets start and end time variables. Also mints initial supply
     * to Contribution contract.
     * @param _startTime opening time of transfer window, based on blocks.
     * @param _endTime closing time of transfer window, based on blocks.
     * @param _initialSupply initial supply of UPTKN.
     */
    constructor(uint _startTime, uint _endTime, uint _initialSupply) ERC20("UpstateToken", "UPTKN") {
        startTime = _startTime;
        endTime = _endTime;
        ERC20._mint(0xcd7A2c5d23CaB2e41a7d778041CfF5C92316ea32, _initialSupply);
    }

    /**
     * @notice Transfers UPTKN to provided address, as long as it is
     * within the transfer window.
     * @dev Uses ERC20's _approve() and transferFrom() functions to
     * transfer UPTKN from the Contribution contract to the ETH contributor.
     * The Contribution contract's address was hardcoded to allow UPTKN transfer.
     * @param _recipient ETH contributor address that will receive UPTKN in return.
     * @param _amount amount of UPTKN contributor will receive.
     */
    function transferUpstateToken(address _recipient, uint _amount) public withinTransferWindow() {
        ERC20._transfer(msg.sender, _recipient, _amount);
    }

    /**
     * @notice Transfers UPTKN to provided address out of Contribution contract,
     * as long as it is within the transfer window.
     * @dev Uses ERC20's _approve() and transferFrom() functions to
     * transfer UPTKN from the Contribution contract to the ETH contributor.
     * The Contribution contract's address was hardcoded to allow UPTKN transfer.
     * @param _recipient ETH contributor address that will receive UPTKN in return.
     * @param _amount amount of UPTKN contributor will receive.
     */
    function ethToUptknContribution(address _recipient, uint _amount) public withinTransferWindow() {
        ERC20._approve(0xcd7A2c5d23CaB2e41a7d778041CfF5C92316ea32, msg.sender, _amount);
        ERC20.transferFrom(0xcd7A2c5d23CaB2e41a7d778041CfF5C92316ea32, _recipient, _amount);
    }
}