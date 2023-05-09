import { createTheme } from "@mui/material";
import { Theta, ThetaTestnet } from "@usedapp/core";
import { JsonRpcProvider } from "@ethersproject/providers";

export const APP_NAME = 'Adoptify'
export const APP_DESC = 'Adoptify is a collectible Theta NFT platform for streamers to boost adoption rates of pets in shelters.'

export const APP_THEME = createTheme({
    palette: {
        primary: {
            main: '#63b7db'
        },
        success: {
            main: '#0097a7'
        },
    }
});

export const CREATE_STEPS = [
    {
        label: 'Pet Info',
        description: 'Enter your pet\'s name and image.',
    },
    {
        label: 'Creator Info',
        description: 'Select a creator to promote the pet for adoption.',
    },
    {
        label: 'Mint NFT',
        description: 'By minting the NFT you support your favorite creator and help the pet find a home.',
    },

]

export const CREATORS = [
    {
        creatorName: 'Chris',
        eth: .015,
        creatorAddress: '0xFc62E94af9aBd25a1D7abfe00F7034Cf154BbBD9',
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      },
    {
      creatorName: 'Brian',
      eth: .01,
      creatorAddress: '0x769694e63eDDE80A98D3279818268a7febe20A90',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    }, {
      creatorName: 'Rika',
      eth: .02,
      creatorAddress: '0x82BD5fD0F73bA74f335917991519b151f7eD6E02',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
  ];

export const EXAMPLE_FORM = 
{
    shelterAddress: '0xFc62E94af9aBd25a1D7abfe00F7034Cf154BbBD9',
    petName: 'Doda (Golden retriever)',
    petUrl: 'https://www.thesprucepets.com/thmb/baW88YsVO_JqNBNJPhCFBHbNUMM=/1500x0/filters:no_upscale():strip_icc()/dog-breed-profile-golden-retriever-1117969-hero-da398f6462704058ace0ef5ae007866d.jpeg',
    ...CREATORS[0] // Default to first creator.
  }

export const ACTIVE_NETWORK = ThetaTestnet;

export const DEFAULT_HOME_PAGE = '/user/transactions'

// usedapp theta testnet config
export const APP_NETWORK_CONFIG = {
    readOnlyChainId: ACTIVE_NETWORK.chainId,
    readOnlyUrls: {
        [ACTIVE_NETWORK.chainId]: 'https://eth-rpc-api-testnet.thetatoken.org/rpc'
    },
    networks: [ACTIVE_NETWORK],
}