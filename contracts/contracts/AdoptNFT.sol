//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AdoptNFT is ERC721 {
    // An AdoptNFT represents a digital NFT purchase of a Adoptify-sponsored pet.

    string private petName; // Name of the theta adopt contract / item.
    string private adoptUrl; // Image to the NFT assets on IFPS or public internet.
    string private creatorName; // Theta creator for the adopt contract.
    address private payableAddress; // Address to credit on purchase.

    uint private price;
    address owner;

    event AdoptNFTPurchased(string creatorName, string petName, address owner, uint price);

    constructor(
        string memory _petName,
        string memory _adoptUrl,
        string memory _creatorName,
        address _payableAddress,
        uint _price
    ) ERC721(_petName, "ADOPT") {
        console.log("Deploying a AdoptNFT with petName:", _petName);
        petName = _petName;
        adoptUrl = _adoptUrl;
        creatorName = _creatorName;
        payableAddress = _payableAddress;
        price = _price;
    }

    function purchaseNFT() public payable {
        // Ensure NFT is not already purchased.
        require(owner == address(0), "Adopt NFT already purchased");
        // Ensure correct amount is sent.
        require(msg.value == price, "Incorrect amount to purchase NFT");

        // Set ownership of NFT to the sender.
        _safeMint(msg.sender, 1);
        owner = msg.sender;

        // Send payment to payableAddress.
        payable(payableAddress).transfer(msg.value);

        emit AdoptNFTPurchased(creatorName, petName, owner, price);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getPrice() public view returns (uint) {
        return price;
    }

    function getpetName() public view returns (string memory) {
        return petName;
    }

    function getCreator() public view returns (string memory) {
        return creatorName;
    }

    function getAdoptUrl() public view returns (string memory) {
        return adoptUrl;
    }

    // Function that returns all metadata as a string.
    function getMetadata() public view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '{"name": "',
                    petName,
                    '", ',
                    '"description": "Adoptify NFT for ',
                    petName,
                    '", ',
                    '"image": "',
                    adoptUrl,
                    '", ',
                    // Owner
                    '"attributes": [',
                    '{"trait_type": "owner", "value": "',
                    owner,
                    '"},',
                    '{"trait_type": "price", "value": "',
                    price,
                    '"},',
                    '{"trait_type": "creator", "value": "',
                    creatorName,
                    '"}',
                    "]",
                    "}"
                )
            );
    }
}
