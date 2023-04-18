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

export const EXAMPLE_FORM = 
{
    userName: "cbono",
    title: "Golden retriever",
    payableAddress: null,
    imgUrl: 'https://www.thesprucepets.com/thmb/baW88YsVO_JqNBNJPhCFBHbNUMM=/1500x0/filters:no_upscale():strip_icc()/dog-breed-profile-golden-retriever-1117969-hero-da398f6462704058ace0ef5ae007866d.jpeg',
    eth: 0.01,
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