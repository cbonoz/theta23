//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AdoptNFT is ERC721 {
    // An AdoptNFT represents a digital NFT purchase of a Adoptify-sponsored pet.

    string private petName; // Name of the theta adopt contract / item.
    string private petImage; // Image to the NFT assets on IFPS or public internet.
    string private creatorName; // Theta creator for the adopt contract.
    address private creatorAddress; // Address to credit on purchase.
    address private shelterAddress; // Address of the shelter to indicate pet as adopted.

    uint private price;

    // adopted
    bool public adopted;

    event AdoptNFTPurchased(string creatorName, string petName, uint price);
    event PetAdopted(string petName, address _creatorName);

    constructor(
        string memory _petName,
        string memory _petImage,
        string memory _creatorName,
        address _creatorAddress,
        address _shelterAddress,
        uint _price
    ) ERC721(_petName, "ADOPT") payable {
        console.log("Deploying a AdoptNFT with petName:", _petName);
        petName = _petName;
        petImage = _petImage;
        creatorName = _creatorName;
        creatorAddress = _creatorAddress;
        shelterAddress = _shelterAddress;
        price = _price;
        adopted = false;

        // Ensure called with sufficient funds
        require(msg.value >= price, "Insufficient funds to purchase NFT.");

        // Transfer price to the creator.
        payable(creatorAddress).transfer(price);

        // Mint the NFT to the caller.
        _safeMint(msg.sender, 0);
    }

    function markAdopted() public {
        // Ensure markAdopted can only be called by the shelter.
        require(msg.sender == shelterAddress, "Adoption can only be indicated by the shelter.");

        // Emit event to indicate pet has been adopted.
        emit PetAdopted(petName, creatorAddress);
        adopted = true;
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
        return petImage;
    }

    function getMetadata() public view returns (string memory) {
        // Return json object of fields
        return string(abi.encodePacked(
            '{',
                '"name": "', petName, '",',
                '"description": "Adoptify NFT for ', petName, '",',
                '"image": "', petImage, '",',
                '"creator": "', creatorName, '",',
                '"creatorAddress": "', creatorAddress, '",',
                '"shelterAddress": "', shelterAddress, '",',
                '"price": "', price, '"',
            '}'
        ));
    }

   
}
