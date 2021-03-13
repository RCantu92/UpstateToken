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


    // Pass parameters to create mintable
    // ERC20 tokens, UPTKN
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

    // Mint provided amount of tokens to
    // provided address
    function mint(address _to, uint _amount) override public {
        ERC20PresetMinterPauser.mint(_to, _amount);
    }

    // Transfer UPTKN to provided address,
    // but only within provided start and
    // end times.
    function transferUpstateToken(
        address _recipient,
        uint _amount
    )
        public withinTransferWindow()
    {
        ERC20.transfer(_recipient, _amount);
    }
}

contract Contribution is UpstateToken {

    mapping(address => uint) adressEthContributionAmount;

    // Contribute ETH,
    // and received equal UPTKN
    function contribute() payable public {
        require(msg.value != 0, "You need to contribute ETH to receive UPTKN");
        addressEthContribution[msg.sender][msg.value];
        UpstateToken.mint(msg.sender, msg.value);
    }

    function addressEthContribution(address _contributor) public view returns (uint) {
        return adressEthContributionAmount[_contributor];
    }
}