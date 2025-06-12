import React from 'react';
import { Box } from '@mui/material';


function EntergyOutage() {
  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <iframe
        src="https://www.etrviewoutage.com/map?state=TX"
        title="Entergy Outage Map"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </Box>
  );
}

export default EntergyOutage;