// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@OpenZeppelin/contracts/token/ERC20/ERC20.sol";
// import "@OpenZeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract UpstateToken is ERC20 {
    
    uint public startTime;
    uint public endTime;
    
    modifier withinTransferWindow() {
        require(startTime < block.number, "The transfer window has not opened.");
        require(block.number < endTime, "The transfer window has closed.");
        _;
    }

    // Pass parameters to create mintable
    // ERC20 tokens, UPTKN
    /*
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
    */

    // Pass parameters to create mintable
    // ERC20 tokens, UPTKN
    constructor(uint _startTime, uint _endTime, uint _initialSupply) ERC20("UpstateToken", "UPTKN") {
        startTime = _startTime;
        endTime = _endTime;
        ERC20._mint(0x1B6051C608bB7f35E6a0eb2B1B9009d3Ef3aF14d, _initialSupply);
    }

    /*
    // Mint provided amount of tokens to
    // provided address
    function mint(address _to, uint _amount) override public {
        ERC20PresetMinterPauser.mint(_to, _amount);
    }
    */

    // Transfer UPTKN to provided address,
    // but only within provided start and
    // end times.
    function transferUpstateToken(address _recipient, uint _amount) public withinTransferWindow() {
        ERC20._approve(0x1B6051C608bB7f35E6a0eb2B1B9009d3Ef3aF14d, msg.sender, _amount);
        ERC20.transferFrom(0x1B6051C608bB7f35E6a0eb2B1B9009d3Ef3aF14d, _recipient, _amount);
    }
}