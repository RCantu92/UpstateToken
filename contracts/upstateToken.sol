// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.0/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";

contract UpstateToken is ERC20PresetFixedSupply {
    
    uint public startTime;
    uint public endTime;
    uint public nowTime = block.number; // delte later
    
    modifier withinTransferWindow() {
        require(startTime < block.number, "The transfer window has not opened.");
        require(block.number < endTime, "The transfer window has closed.");
        _;
    }

    constructor(
        uint _startTime,
        uint _endTime
    ) ERC20PresetFixedSupply(
        "UpstateToken",
        "UPTKN",
        10000000000000000000000,
        msg.sender
    )
    {
        startTime = _startTime;
        endTime = _endTime;
    }

    function transferUpstateToken(
        address _recipient,
        uint _amount
    )
        public withinTransferWindow()
    {
        ERC20.transfer(_recipient, _amount);
    }
}