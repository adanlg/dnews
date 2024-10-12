// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract NewsOwnership {
    IERC20 public acceptedToken;
    address public owner;
    uint256 public tokenAmount;
    mapping(string => address) public newsOwners;
    string[] private newsIds; 
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address _tokenAddress) {
        owner = msg.sender;
        acceptedToken = IERC20(_tokenAddress);
    }

    function changeTokenAmount(uint256 _tokenAmount) public onlyOwner {
        tokenAmount = _tokenAmount;
    }

    function receiveTokenAndUpdateOwner(string memory newsId) external {
        require(acceptedToken.transferFrom(msg.sender, address(this), tokenAmount), "Transfer failed");

        if (newsOwners[newsId] == address(0)) { 
            newsIds.push(newsId);
        }
        newsOwners[newsId] = msg.sender; 
    }

    function withdrawTokens() external onlyOwner {
        uint256 balance = acceptedToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(acceptedToken.transfer(owner, balance), "Withdrawal failed");
    }

    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        (bool sent, ) = owner.call{value: balance}("");
        require(sent, "Failed to send ETH");
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        owner = newOwner;
    }

    function getAllNewsOwners() external view returns (string[] memory, address[] memory) {
        address[] memory owners = new address[](newsIds.length);
        for (uint i = 0; i < newsIds.length; i++) {
            owners[i] = newsOwners[newsIds[i]];
        }
        return (newsIds, owners);
    }

    receive() external payable {}
}
