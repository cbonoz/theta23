import { ethers } from "ethers";
import { ADOPT_CONTRACT } from "./metadata";

const getSigner = async () => {
  let signer;
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  return signer;
};

export const getPrimaryAccount = async () => {
  let provider;
  await window.ethereum.enable();
  provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();
  return accounts[0];
};

// https://dapp-world.com/smartbook/how-to-use-ethers-with-polygon-k5Hn
export async function deployContract(petName, petUrl, creatorName, creatorAddr, shelterAddr, priceEth) {
  const signer = await getSigner();

  //   https://dev.to/yosi/deploy-a-smart-contract-with-ethersjs-28no

  // Create an instance of a Contract Factory
  const factory = new ethers.ContractFactory(
    ADOPT_CONTRACT.abi,
    ADOPT_CONTRACT.bytecode,
    signer
  );

  const creatorAddress = ethers.utils.getAddress(creatorAddr);
  const shelterAddress = ethers.utils.getAddress(shelterAddr);
  const priceWei = ethers.utils.parseUnits(priceEth.toString(), 'ether')
  console.log('deploying', petName, petUrl, creatorName, creatorAddress, shelterAddress, priceEth, priceWei)

  // Start deployment, returning a promise that resolves to a contract object
  let contract;
  const options = {value: ethers.utils.parseEther(priceEth + "")}
  contract = await factory.deploy(petName, petUrl, creatorName, creatorAddress, shelterAddress, priceWei, options);
  await contract.deployed();
  console.log("Contract deployed to address:", contract.address);
  return contract;
}

export const validAddress = (addr) => {
  try {
    ethers.utils.getAddress(addr);
    return true;
  } catch (e) {
    return false;
  }
};

export const getContractBundleUrl = async (contractAddress) => {
  if (!contractAddress) {
    return null
  }
  const signer = await getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    ADOPT_CONTRACT.abi,
    signer
  );
  const result = await contract.getBundleUrl();
  return result;
};

export const getMetadata = async (contractAddress) => {
  if (!contractAddress) {
    return {};
  }
  const signer = await getSigner();
  const adoptContract = new ethers.Contract(
    contractAddress,
    ADOPT_CONTRACT.abi,
    signer
  );
  const result = await adoptContract.getMetadata();
  return result;
};



export const markAdopted = async (contractAddress, eth) => {
  if (!contractAddress) {
    return null
  }
  const signer = await getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    ADOPT_CONTRACT.abi,
    signer
  );
  const options = {value: ethers.utils.parseEther(eth + "")}
  const result = await contract.purchaseNFT(options);
  return result;
};