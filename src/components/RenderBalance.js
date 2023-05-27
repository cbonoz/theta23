import { CircularProgress } from '@mui/material';
import { ethers } from 'ethers';
import React from 'react'

export default function RenderBalance({ account, amount, loading }) {
    if (loading) {
        return <CircularProgress />
    }

    if (!account || !amount) { return null; }
    const etherBalance = ethers.utils.formatEther(amount.toString());

    return (
        <span color="white" fontSize="md">
            <b>{etherBalance} TFUEL</b>
        </span>
    );
}
