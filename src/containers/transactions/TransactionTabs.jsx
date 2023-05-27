import {React, useState} from 'react'
import { Box, Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import { Analytics, RegisteredPets } from '..';

const TransactionTabs = () => {
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
                <Tab label="Registered Pets" value="0" />
                <Tab label="Analytics" value="1" />
              </TabList>
            </Box>
            <TabPanel value="0">
              <RegisteredPets />
            </TabPanel>
            <TabPanel value="1">
              <Analytics />
            </TabPanel>
          </TabContext>
        </Box>
    </div>
  )
}

export default TransactionTabs