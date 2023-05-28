import {React, useState} from 'react'
import { Box, Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import { DonorAnalytics, AdoptedPets } from '..';

const DonorTransactionTabs = () => {
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
                <Tab label="Adopted Pets" value="0" />
                <Tab label="Analytics" value="1" />
              </TabList>
            </Box>
            <TabPanel value="0">
              <AdoptedPets />
            </TabPanel>
            <TabPanel value="1">
              <DonorAnalytics />
            </TabPanel>
          </TabContext>
        </Box>
    </div>
  )
}

export default DonorTransactionTabs