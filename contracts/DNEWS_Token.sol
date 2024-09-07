// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.2/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";
import "@openzeppelin/contracts@5.0.2/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts@5.0.2/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts@5.0.2/token/ERC20/extensions/ERC20FlashMint.sol";

contract Dnews is ERC20, ERC20Burnable, Ownable, ERC20Permit, ERC20Votes, ERC20FlashMint {

    constructor(address initialOwner, uint256 _totalSupply, address _initialTokenOwner)
        ERC20("Dnews", "NEWS")
        Ownable(initialOwner)
        ERC20Permit("Dnews")
    {
        _mint(_initialTokenOwner, _totalSupply);
    }


    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
