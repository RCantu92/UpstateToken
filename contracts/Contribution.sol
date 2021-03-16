// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@OpenZeppelin/contracts/math/SafeMath.sol";
import "./UpstateToken.sol";

/**
 * @title Contribution, contract that accepts ETH contributions
 * and returns ERC20 UPTKN to contributor.
 * @author Roberto Cantu
 * @notice Creates new token, UPTKN, that can only be transfered
 * within provided block-based time window.
 * @dev Uses ERC20 functionality from OpenZeppelin.
 */
contract Contribution is UpstateToken {

    using SafeMath for uint;

    mapping(address => uint) addressEthContribution;

    /**
     * @notice Creates new ERC20 UpstateToken (UPTKN) as well as
     * sets time window, which would restrict token's transferability.
     * @dev Passes paramets to UpstateToken.contructor.
     * @param _startTime opening time of transfer window, based on blocks.
     * @param _endTime closing time of transfer window, based on blocks.
     * @param _initialSupply initial supply of UPTKN.
     */
    constructor(
        uint _startTime,
        uint _endTime,
        uint _initialSupply
    ) UpstateToken(
        _startTime,
        _endTime,
        _initialSupply
    ) { }

    /**
     * @notice Accepts ETH contributions and returns contributor
     * UPTKN in equal amount of contribution.
     * @dev Verifies msg.value is not zero, adds ETH contribution to
     * amount of ETH the address has contributed, returns UPTKN in same
     * amount as ETH contributed.
     */
    function contribute() payable public {
        require(msg.value != 0, "You need to contribute ETH to receive UPTKN");
        addressEthContribution[msg.sender] = addressEthContribution[msg.sender].add(msg.value);
        UpstateToken.transferUpstateToken(msg.sender, msg.value);
    }

    /**
     * @notice Displays how much ETH provided address has contributed.
     * @dev Calls mapping to return stored uint equaling contributed ETH.
     */
    function contributedEth(address _contributor) public view returns (uint) {
        return addressEthContribution[_contributor];
    }
}