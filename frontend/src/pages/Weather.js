import { Box } from '@mui/material';


function Weather() {
  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <iframe
        src="https://www.rainviewer.com/map.html?loc=30.1071,-94.1748,6&oCS=1&oAP=1&c=3&o=83&lm=1&layer=sat-rad&sm=1&sn=1"
        title="Weather"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </Box>
  );
}

export default Weather;