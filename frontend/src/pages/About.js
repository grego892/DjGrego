import React from 'react';
import { Typography } from '@mui/material';

function About() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <Typography paragraph>
        This is a simple Song Management Application that allows you to maintain a list of your favorite songs.
      </Typography>
    </div>
  );
}

export default About;