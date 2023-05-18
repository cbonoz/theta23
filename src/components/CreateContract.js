import React, { useState, useEffect } from "react";

// import { StreamDropzone } from "./StreamDropzone";
// import { storeFiles } from "../util/stor";
import { deployContract } from "../contract/adoptContract";
import { getListingUrl, ipfsUrl, transactionUrl } from "../util";
import {
  Button,
  CardMedia,
  CardActions,
  Typography,
  Input,
  Grid,
  Box,
  InputLabel,
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material"
import { ethers } from 'ethers'
import { useEthers } from "@usedapp/core";
import { ACTIVE_NETWORK, APP_NAME, CREATE_STEPS, CREATORS, EXAMPLE_FORM } from "../constants";
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

  const [creators, setCreators] = useState({});

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
      creatorName: creator.streamer.username,
      creatorAddress: '0x4265690709E6C40a92ac8dc2A61AC8F1913Fe313',
      eth: '0.01',
    })
  };

  const fetchCreators = () => {
    fetch("https://api.theta.tv/v1/gfuel/channel/list?incl_off=true&number=8")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setCreators(data.body)
      }
    )
  }

  useEffect(() => {
    if (Object.keys(creators).length === 0) {
      fetchCreators()
    }
    console.log(creators)
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

      case 2:
        return (<div>
          <h2 className="sell-header">
            Select a creator to promote this pet
          </h2>

          {creators.map((creator, index) => {
            console.log(creator.live_stream.video_urls[0].url)
            return (
              <Card key={index} className="creator-card">
                <a href={'https://www.theta.tv/' + creator.streamer.username} target="_blank">
                  <CardMedia
                    sx={{ height: 140 }}
                    image={creator.streamer.avatar_url}
                    title="theta streamer"
                  />
                </a>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {creator.streamer.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {creator.streamer.id} Eth
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


          <Box sx={{ m: 1 }}>

            <InputLabel
              htmlFor="component-simple"
            >Enter creator/promoter name</InputLabel>

            <Input
              addonBefore={"DisplayName"}
              fullWidth
              disabled
              placeholder="Enter creator name"
              value={info.creatorName}
              onChange={(e) => updateInfo({ creatorName: e.target.value })}
            />

          </Box>

          <Box sx={{ m: 1 }}>

            <InputLabel
              htmlFor="component-simple"
            >Creator address</InputLabel>

            <Input
              addonBefore={"Payment Address"}
              fullWidth
              disabled
              placeholder="Payment Address: "
              value={info.creatorAddress}
            />

          </Box>


          <Box sx={{ m: 1 }}>

            <InputLabel
              htmlFor="component-simple"
            >Enter adoption price (Eth)</InputLabel>

            <Input
              fullWidth
              disabled
              addonBefore={"Price (eth)"}
              placeholder="Name your eth price"
              value={info.eth}
              onChange={(e) => updateInfo({ eth: e.target.value })}
            />
          </Box>

        </div>)
      case 3: // upload
        return (<div>
          <h2 className="sell-header">Preview creation</h2>
          <Listify object={info} />
        </div>
        );
      case 4: // done
        return (
          <div className="complete-section">
            <h2 className="sell-header green">Complete!</h2>
            {
              result.transactionHash && <p>
              View transaction<br />
              <a target="_blank" href={transactionUrl(result.transactionHash)}>{result.transactionHash}</a>
              </p>
            }
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
        <Grid item xs={16} md={8} lg={8}>

          {/* <Content> */}
          <div className="sell-area">
            <Card className="standard-card" title="Preview creation">
              <CardContent>
                {getBody()}
              </CardContent>
            </Card>
          </div>

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
              variant="contained"
              color="primary"
              onClick={() => updateStep(1)}
            >
              {currentStep === LAST_STEP - 1 ? "Mint Adoptify NFT" : "Next"}
            </LoadingButton>
          )}
        </Grid>

        <Grid
          item
          xs={4}
          md={4}
          lg={4}
        >
        <Card className="standard-card" title="Instructions">
          <p><b>Instructions</b></p>
            <CardContent>
              <Stepper activeStep={currentStep-1} orientation="vertical">
                {CREATE_STEPS.map(({ label, description }, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <Typography>
                    {description}
                    </Typography>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>


      </Grid>
    </div>
  );
}

export default CreateContract;