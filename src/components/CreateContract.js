import React, { useState, useEffect } from "react";

// import { StreamDropzone } from "./StreamDropzone";
// import { storeFiles } from "../util/stor";
import { deployContract } from "../contract/adoptContract";
import { getListingUrl, ipfsUrl, transactionUrl } from "../util";
import { Button, CardMedia, CardActions, Typography, Input, Grid, Box, InputLabel, Card, CardContent, CardHeader } from "@mui/material"
import { ethers } from 'ethers'
import { useEthers } from "@usedapp/core";
import { ACTIVE_NETWORK, APP_NAME, CREATORS, EXAMPLE_FORM } from "../constants";
import { LoadingButton } from "@mui/lab";
import Listify from "./Listify";

const LAST_STEP = 3;

function CreateContract({ isLoggedIn, signer, provider, blockExplorer }) {
  const { activateBrowserWallet, switchNetwork, chainId, account } = useEthers();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn && currentStep === 0) updateStep(1);
  }, [isLoggedIn]);

  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});

  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  const setDemoData = (e) => {
    e.preventDefault();
    setInfo({ ...EXAMPLE_FORM });
  };

  const clearInfo = () => setInfo({});

  const updateInfo = (update) => {
    setInfo({ ...info, ...update });
  };

  const updateStep = async (offset) => {
    const newStep = currentStep + offset;
    if (newStep === LAST_STEP) {
      if (!files) {
        alert("At least one file must be added");
        return;
      }

      // Ethereum request switch if not on ACTIVE_NETWORK.id
      if (chainId !== ACTIVE_NETWORK.chainId) {
        try {
          await switchNetwork(ACTIVE_NETWORK.chainId)
        } catch (e) {
          alert(`Please switch your wallet to ${ACTIVE_NETWORK.name} to continue`)
          return;
        }
      }

      setLoading(true);

      try {


        let res = "";
        // TODO: upload pet photos to IPFS
        // res = await storeFiles(files, info);
        // setResult(res);
        // const adoptUrl = ipfsUrl(res);

        // TODO: after upload of files, create the contract.

        // TODO: BRIAN UPDATE with correct parameters for NFT mint.
        const contract = await deployContract(
          info.petName,
          info.petUrl,
          info.creatorName,
          info.creatorAddress,
          info.shelterAddress,
          info.eth
        );

        console.log("deployed contract", contract);

        const card = {
          ...info,
          purchaseUrl: getListingUrl(contract.address),
          contract: contract.address,
          transactionHash: contract.deployTransaction.hash,
          createdAt: new Date(),
        };

        setResult(card);

        // Add the newly created stream to index (optional).
        // addCard(card);
      } catch (e) {
        console.error("error creating listing", e);
        alert('Error creating listing: ' + e.message)
        return;
      } finally {
        setLoading(false);
      }
    }

    console.log("update step", newStep);
    setCurrentStep(newStep);
  };

  const selectCreator = (creator) => {
    updateInfo({
      creatorName: creator.name,
      creatorAddress: creator.wallet,
      eth: creator.price,
    })
  };

  useEffect(() => {
    if (!!account) {
      if (currentStep === 0) {
        updateStep(1)
      }
      if (!info.payableAddress) {
        updateInfo({ payableAddress: account })
      }
    }

  }, [account])

  const getBody = () => {
    switch (currentStep) {
      case 0: // confirm login
        return (
          <div>
            <h2 className="sell-header">Login</h2>
            <br />
            <p>
              In order to create a listing, you must login with your metamask or
              wallet account. Click 'Connect Wallet' in the top right to begin.
            </p>
          </div>
        );
      case 1: // info
        return (
          <div className="info-section">
            <h2 className="sell-header">What pet are you looking to promote?</h2>

            <a href="#" onClick={setDemoData} className="normal-link">
              Set demo data
            </a>

            <Box sx={{ m: 1 }}>

              <InputLabel
                htmlFor="component-simple"
              >Enter pet name / information</InputLabel>

              <Input
                addonBefore={"Animal to adopt"}
                fullWidth

                placeholder="Enter pet name"
                value={info.petName}
                onChange={(e) => updateInfo({ petName: e.target.value })}
              />
            </Box>


            <Box sx={{ m: 1 }}>

              <InputLabel
                htmlFor="component-simple"
              >Provide image url for pet</InputLabel>

              <Input
                addonBefore={"Image"}
                fullWidth

                addonAfter={"A default will be used if blank"}
                placeholder="Enter listing image or thumbnail url (optional)"
                value={info.petUrl}
                onChange={(e) => updateInfo({ petUrl: e.target.value })}
              />
            </Box>

            <Box sx={{ m: 1 }}>

              <InputLabel
                htmlFor="component-simple"
              >Enter creator/promoter name</InputLabel>

              <Input
                addonBefore={"DisplayName"}
                fullWidth
                placeholder="Enter creator name"
                value={info.creatorName}
                onChange={(e) => updateInfo({ creatorName: e.target.value })}
              />

            </Box>

            <Box sx={{ m: 1 }}>

              <InputLabel
                htmlFor="component-simple"
              >Enter adoption price (Eth)</InputLabel>

              <Input
                fullWidth
                addonBefore={"Price (eth)"}
                placeholder="Name your eth price"
                value={info.eth}
                onChange={(e) => updateInfo({ eth: e.target.value })}
              />
            </Box>

            <Box sx={{ m: 1 }}>

              <InputLabel
                htmlFor="component-simple"
              >Creator address</InputLabel>

              <Input
                addonBefore={"Payment Address"}
                fullWidth
                placeholder="Payment Address: "
                value={info.creatorAddress}
              />

            </Box>

            <Box sx={{ m: 1 }}>

              <InputLabel
                htmlFor="component-simple"
              >Shelter address</InputLabel>

              <Input
                addonBefore={"Shelter Address"}
                fullWidth
                placeholder="Shelter Address"
                value={info.shelterAddress}
              />

            </Box>
            {/* <p><br/>{UPLOAD_INFO}</p> */}
          </div>
        );
      case 2: // upload
        return (<div>
          <h2 className="sell-header">Preview creation</h2>
          <Listify object={info} />
        </div>
        );
      case 3: // done
        return (
          <div className="complete-section">
            <h2 className="sell-header green">Complete!</h2>
            {result.transactionHash && <p>
              View transaction<br />
              <a target="_blank" href={transactionUrl(result.transactionHash)}>{result.transactionHash}</a></p>}

            <p>Share the contract purchase address below!</p>
            <Listify object={result} />
            <br />
            <h3>Listing information</h3>
            <Listify object={info} />
            {result.url && (
              <a href={result.url} target="_blank">
                Click here to view contract
              </a>
            )}
          </div>
        );
    }
  };

  return (
    <div className="content">
      {/* <h1 className="sell-heading">Publish a new {APP_NAME} contract</h1> */}
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          {/* <Steps current={currentStep}>
          <Step title="Login" description="Authenticate." />
          <Step title="Information" description="What are you listing?" />
          <Step title="Upload" description="Upload video(s) for purchase." />
          <Step title="Done" description="Share your contract." />
        </Steps> */}
          {/* <Content> */}
          <div className="sell-area">
            <Card className="standard-card" title="Preview creation">
              <CardContent>
                {getBody()}
              </CardContent>
            </Card>
          </div>
          {currentStep === 1 && <div>
            <h3>Select a pre-existing creator</h3>
            {
              CREATORS.map((creator, index) => {
                return (
                  <Card key={index} className="creator-card">
                    <CardMedia
                      sx={{ height: 140 }}
                      image={creator.image}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {creator.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${creator.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => selectCreator(creator)}>
                        {'Select'}
                      </Button>
                    </CardActions>
                  </Card>
                )
              })
            }
          </div>}
          {/* </Content> */}
          {(currentStep !== 0 || (currentStep !== 1 && !isLoggedIn)) && (
            <Button
              disabled={loading}
              type="primary"
              onClick={() => updateStep(-1)}
            >
              Previous
            </Button>
          )}
          &nbsp;
          {currentStep < LAST_STEP && (
            <LoadingButton
              disabled={loading || !account}
              loading={loading}

              variant="text"
              color="primary"
              onClick={() => updateStep(1)}
            >
              {currentStep === LAST_STEP - 1 ? "Create Contract" : "Next"}
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateContract;