import React from 'react';
import { Typography } from '@mui/material';

function EntergyOutage() {
  return (
    <div>
      <iframe
        src="https://www.etrviewoutage.com/map?state=TX"
        title="Entergy Outage Map"
        width="100%"
        height="635px"
        style={{ border: 'none' }}
      />
    </div>
  );
}

export default EntergyOutage;