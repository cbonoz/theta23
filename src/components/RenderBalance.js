import { useEtherBalance, useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
import React from 'react'

export default function RenderBalance({ account, amount }) {
    if (!account || !amount) {return null;}
    const etherBalance = ethers.utils.formatEther(amount.toString());

    return (
        <span color="white" fontSize="md">
            <b>{etherBalance} TFUEL</b> {account.slice(0, 6)}**
        </span>
    );
}
