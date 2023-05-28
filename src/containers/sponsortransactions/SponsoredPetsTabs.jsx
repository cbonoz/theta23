import {React, useState} from 'react'
import { Box, Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import SponsorAnimalCards from './SponsorAnimalCards';

const SponsoredPetsTabs = () => {
  const [tabValue, setTabValue] = useState("0")
  const handleChange = (e, value) => {
    setTabValue(value)
  }
  return (
    <div>
      <Box>
          <SponsorAnimalCards />
        </Box>
    </div>
  )
}

export default SponsoredPetsTabs