import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:8000/songs');
      const data = await response.json();
      setSongs(data.songs);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Songs List
      </Typography>
      <List>
        {songs.map((song, index) => (
          <ListItem key={index}>
            <ListItemText primary={song.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Home;