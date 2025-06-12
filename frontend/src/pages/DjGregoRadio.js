import React from 'react';
import {Box} from '@mui/material';

function DjGregoRadio() {
  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <iframe
        src="https://radio.djgrego.com/public/djgrego_radio"
        title="Weather"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </Box>
  );
}

export default DjGregoRadio;