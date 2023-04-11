//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract AdoptContract {
    // A AdoptContract represents a digital NFT purchase of a Adoptify pet.
    
    string private name; // Name of the theta adopt contract / item.
    string private adoptUrl; // Link to the NFT assets on IFPS.
    string private creatorName; // Theta creator for the adopt contract.
    address private payableAddress; // Address to credit on purchase.

    uint private price;
    address owner;

    constructor(string memory _name, string memory _adoptUrl, string memory _creatorName, address _payableAddress, uint _price) {
        
        console.log("Deploying a AdoptContract with name:", _name);
        name = _name;
        adoptUrl = _adoptUrl;
        creatorName = _creatorName;
        payableAddress = _payableAddress;
        price = _price;
    }

    function purchase() public payable {
        require(owner == address(0) , "Adopt already purchased");
        require(msg.value == price, "Incorrect amount");

        // Set ownership of contract.
        payable(payableAddress).transfer(msg.value);
        owner = msg.sender;
    }

     function getOwner() public view returns (address) {
        return owner;
    }

    function getPrice() public view returns (uint) {
        return price;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getCreator() public view returns (string memory) {
        return creatorName;
    }

    function getAdoptUrl() public view returns (string memory) {
        return adoptUrl;
    }

}