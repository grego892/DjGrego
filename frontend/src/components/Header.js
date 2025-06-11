import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Header = ({
  drawerWidth,
  onDrawerToggle,
  darkMode,
  onDarkModeToggle,
  drawerOpen,
  onDrawerOpen
}) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
        ml: { sm: `${drawerOpen ? drawerWidth : 0}px` },
        transition: (theme) =>
          theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        bgcolor: (theme) => darkMode ? '#002660' : '#ffffff',
        color: (theme) => darkMode ? '#a4b3b6' : '#000000'

      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={drawerOpen ? onDrawerToggle : onDrawerOpen}
          sx={{ mr: 2, display: { sm: !drawerOpen ? 'flex' : 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
          DjGrego
        </Typography>
        <Box>
          <IconButton
            sx={{ ml: 1 }}
            onClick={onDarkModeToggle}
            color="inherit"
            aria-label="toggle dark mode"
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => navigate('/about')}
            color="inherit"
            aria-label="about"
          >
            {darkMode ? <MoreVertIcon /> : <MoreVertIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;