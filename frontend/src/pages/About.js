import React from 'react';
import { Typography } from '@mui/material';
import packageInfo from '../../package.json';


function About() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Version: {packageInfo.version}
      </Typography>

    </div>
  );
}

export default About;