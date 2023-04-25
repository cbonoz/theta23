import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMetadata, purchaseContract } from '../contract/adoptContract';
import { Button, Card } from '@mui/material';
import { APP_NAME } from '../constants';
import { getRpcError } from '../util';

// This page should page a contractAddress path parameter enable a web3 transaction to credit a user with a link referral, 
// and then redirect to url stored in state
export default function Purchase({ activeChain, account, provider }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [data, setData] = useState({})
    const [showAbout, setShowAbout] = useState(false)
    const [success, setSuccess] = useState(false)

    const { contractAddress } = useParams();

    async function completePurchase() {
        if (!contractAddress || !account) {
            return
        }
        setLoading(true)
        try {
            const result = await purchaseContract(contractAddress, data.price);
            console.log(result);
            // Redirect and referral successful.

            // Add notification
            // await sendPush(data.owner, account, redirectUrl)

            // Send to page
            setSuccess(true)
        } catch (e) {
            console.log(e)
            const err = getRpcError(e)
            setError('Error completing purchase: ' + err)
        }
        finally {
            setLoading(false)
        }
    }


    async function load() {
        if (!contractAddress || !account) {
            return
        }
        setLoading(true)
        try {
            const res = await getMetadata(contractAddress)

            console.log('res', res)
            // Unpack the response
            setData({
                title: res[0],
                redirectUrl: res[1],
                owner: res[2],
                reward: res[3],
            })
        } catch (e) {
            console.log(e)
            let message = getRpcError(e)
            if (message.indexOf('call revert') !== -1) {
                message = 'You may be connected to the wrong network. Please check selected network and metamask and try again.'
            }

            setError('Error reading link data: ' + message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (account) {
            setError(undefined)
            load()
        } else {
            setError('Please connect your wallet to continue.')
        }
    }, [provider, account])

    if (loading) {
        return <div>Waiting for user interaction...</div>
    }

    const { redirectUrl, title, owner, reward } = data
    const fullRedirectUrl = `${redirectUrl || ''}?ref=${account}`

    const alreadyReferred = error?.indexOf('already referred') !== -1
    const walletError = error?.indexOf('wallet to continue') !== -1

    if (alreadyReferred) {
        return <div>
            <span className='error-text'>{error}</span>
            <br />
            <br />
            {alreadyReferred && <div>
                <p>You may still continue to the page: {redirectUrl}</p>
                <Button type="primary" onClick={() => window.open(fullRedirectUrl)}>Continue to page</Button>
            </div>}

        </div>
    }

    const openAbout = () => {
        setShowAbout(true)
    }

    return (
        <div>
            <Card title={'Purchase NFT'}>
                {title && <p>Title: {title}</p>}
                {walletError && <p>This is a {APP_NAME} referral page.</p>}
                {!error && <p>You will be redirected to the following page when you click the button below:</p>}
                {redirectUrl && <p>Redirect URL: {redirectUrl}</p>}
                {error && <div className='error-text'>{error}</div>}
                {!success && <Button
                    disabled={!redirectUrl || !account || error}
                    type="primary"
                    onClick={() => {
                        completePurchase()
                    }}
                >
                    Continue to page
                </Button>}
            </Card>

            {/* <Modal
                title="About"
                open={showAbout}
                onOk={() => setShowAbout(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
                onCancel={() => setShowAbout(false)}
            >
                <About />
            </Modal>

            <Modal
                title={<span className='success-text'>Referral successful</span>}
                open={success}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                onCancel={() => setSuccess(false)}>
                <hr />
                <h3>Proceed to page below</h3>
                <a href={fullRedirectUrl} rel="noreferrer">{fullRedirectUrl}</a>
                <br />
                <br />
                <p>Thanks for using {APP_NAME}!</p>
            </Modal> */}
        </div>
    )
}