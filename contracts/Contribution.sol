// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@OpenZeppelin/contracts/math/SafeMath.sol";
import "./UpstateToken.sol";

contract Contribution is UpstateToken {

    using SafeMath for uint;

    mapping(address => uint) addressEthContribution;

    // Pass along parameters to UpstateToken contructor to create new ERC20 token.
    constructor(uint _startTime, uint _endTime, uint _initialSupply) UpstateToken(_startTime, _endTime, _initialSupply) { }

    // Contribute ETH,
    // and received equal amount of UPTKN
    function contribute() payable public {
        require(msg.value != 0, "You need to contribute ETH to receive UPTKN");
        addressEthContribution[msg.sender] = addressEthContribution[msg.sender].add(msg.value);
        uint uptknToReceive = msg.value;

        // Transfer UPTKN, based on ETH contribution, from this contract to msg.sender from msg.sender
        UpstateToken.transferUpstateToken(msg.sender, uptknToReceive);
    }

    // View function that returns the amount of ETH that has been
    // contributed by msg.sender
    function contributedEth(address _contributor) public view returns (uint) {
        return addressEthContribution[_contributor];
    }
}