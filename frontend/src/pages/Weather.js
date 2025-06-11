import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

function Weather() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 120px)', // Adjust based on your layout
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'

      }}
    >
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CircularProgress />
        </Box>
      )}
      
      {hasError && (
        <Typography color="error" sx={{ mt: 2 }}>
          Failed to load weather map. Please try again later.
        </Typography>
      )}

      <iframe
        src="https://www.rainviewer.com/map.html?loc=30.1071,-94.1748,6&oCS=1&oAP=1&c=3&o=83&lm=1&layer=sat-rad&sm=1&sn=1"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{
          border: 0,
          visibility: isLoading ? 'hidden' : 'visible'
        }}
        allowFullScreen
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        title="Weather Map"
      />
    </Box>
  );
}

export default Weather;