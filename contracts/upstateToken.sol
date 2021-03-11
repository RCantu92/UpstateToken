// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@OpenZeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract UpstateToken is ERC20PresetMinterPauser {
    
    uint public startTime;
    uint public endTime;
    uint public nowTime = block.number; // delete later
    
    modifier withinTransferWindow() {
        require(startTime < block.number, "The transfer window has not opened.");
        require(block.number < endTime, "The transfer window has closed.");
        _;
    }

    constructor(
        uint _startTime,
        uint _endTime
    ) ERC20PresetMinterPauser(
        "UpstateToken",
        "UPTKN"
    )
    {
        startTime = _startTime;
        endTime = _endTime;
    }

    function mint(address _to, uint _amount) override public {
        ERC20PresetMinterPauser.mint(_to, _amount);
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