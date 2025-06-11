
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddSong() {
  const [newSong, setNewSong] = useState('');
  const navigate = useNavigate();

  const addSong = async () => {
    if (!newSong.trim()) return;

    try {
      const response = await fetch('http://localhost:8000/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newSong }),
      });

      if (response.ok) {
        setNewSong('');
        navigate('/'); // Redirect to songs list after successful addition
      }
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Add New Song
      </Typography>
      <div style={{ marginTop: '20px' }}>
        <TextField
          label="Song Name"
          value={newSong}
          onChange={(e) => setNewSong(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" onClick={addSong}>
          Add Song
        </Button>
      </div>
    </div>
  );
}

export default AddSong;