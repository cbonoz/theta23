import {React, useState} from 'react'
import { Box, Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import AnimalCards from './AnimalCards';

const MarketplaceTabs = () => {
  const [tabValue, setTabValue] = useState("0")
  const handleChange = (e, value) => {
    setTabValue(value)
  }
  return (
    <div>
      <Box>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, 
                borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
              >
                <Tab label="All" value="0" />
                <Tab label="Dogs" value="1" />
                <Tab label="Cats" value="2" />
                <Tab label="Birds" value="3" />
                <Tab label="Garden Animals" value="4" />
                <Tab label="Livestock" value="5" />
              </TabList>
            </Box>
            <TabPanel value="0">
              <AnimalCards type={"all"} />
            </TabPanel>
            <TabPanel value="1">
              <AnimalCards type={"dog"} />
            </TabPanel>
            <TabPanel value="2">
              <AnimalCards type={"cat"} />
            </TabPanel>
            <TabPanel value="3">
              <AnimalCards type={"bird"} />
            </TabPanel>
            <TabPanel value="4">
              <AnimalCards type={"gardenAnimal"} />
            </TabPanel>
            <TabPanel value="5">
              <AnimalCards type={"livestock"} />
            </TabPanel>
          </TabContext>
        </Box>
    </div>
  )
}

export default MarketplaceTabs