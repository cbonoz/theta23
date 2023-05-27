import {React, useState} from 'react'
import { Box, Tabs, Tab } from '@mui/material';
import { TabPanel } from '@mui/lab';

const TransactionTabs = () => {
  const [tabValue, setTabValue] = useState(0)
  const handleChange = (value) => {
    setTabValue(value)
  }
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(e, value) => handleChange(value)}>
          <Tab value={0} label="Registered Pets" />
          <Tab value={1} label="Analytics" />
        </Tabs>
      </Box>
      {/* <TabPanel value={tabValue} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Item Two
      </TabPanel> */}
    </div>
  )
}

export default TransactionTabs