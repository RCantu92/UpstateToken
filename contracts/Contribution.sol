// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@OpenZeppelin/contracts/math/SafeMath.sol";
import "./UpstateToken.sol";

contract Contribution is UpstateToken {

    using SafeMath for uint;

    mapping(address => uint) addressEthContribution;

    constructor(uint _startTime, uint _endTime) UpstateToken(_startTime, _endTime) { }

    // Contribute ETH,
    // and received equal UPTKN
    function contribute() payable public {
        require(msg.value != 0, "You need to contribute ETH to receive UPTKN");
        addressEthContribution[msg.sender] = addressEthContribution[msg.sender].add(msg.value);
        UpstateToken.mint(msg.sender, msg.value);
    }

    function contributedEth(address _contributor) public view returns (uint) {
        return addressEthContribution[_contributor];
    }
}