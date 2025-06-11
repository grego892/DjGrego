import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme/theme';
import Header from './components/Header';
import NavDrawer from './components/NavDrawer';
import Home from './pages/Home';
import Weather from './pages/Weather';
import AddSong from './components/AddSong';
import About from './pages/About';
import Studio from './pages/Studio';
import FileManager from './pages/FileManager';
import AudioEditor from './pages/AudioEditor';
import Setup from './pages/Setup';

const drawerWidth = 200;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [activeRoute, setActiveRoute] = useState(window.location.pathname); // Add this line

  // Add this handler
  const handleNavigation = (path) => {
    setActiveRoute(path);
  };

  const theme = createAppTheme(darkMode);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/*<Box sx={{ display: 'flex' }}>*/}
        <Box sx={{ display: 'flex', overflowX: 'hidden' }}>
          <CssBaseline />

          <Header
            drawerWidth={drawerWidth}
            onDrawerToggle={handleDrawerToggle}
            darkMode={darkMode}
            onDarkModeToggle={handleDarkModeToggle}
            drawerOpen={drawerOpen}
            onDrawerOpen={handleDrawerOpen}
          />

          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {/* Mobile drawer */}
            <NavDrawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              drawerWidth={drawerWidth}
              onItemClick={() => setMobileOpen(false)}
              onDrawerClose={handleDrawerClose}
              darkMode={darkMode}
              activeRoute={activeRoute}
              onNavigate={handleNavigation}
              sx={{
                display: { xs: 'block', sm: 'none' }
              }}
            />

            {/* Desktop drawer */}
            <NavDrawer
              variant="persistent"
              open={drawerOpen}
              drawerWidth={drawerWidth}
              onDrawerClose={handleDrawerClose}
              darkMode={darkMode}
              activeRoute={activeRoute}
              onNavigate={handleNavigation}
              sx={{
                display: { xs: 'none', sm: 'block' }
              }}
            />
          </Box>

          <Box
            component="main"
            sx={{ 
              flexGrow: 1, 
              p: 3,
              width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
              marginTop: '64px',
              //marginLeft: { sm: drawerOpen ? `${drawerWidth}px` : 0 },
              transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/add" element={<AddSong />} />
            <Route path="/about" element={<About />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/filemanager" element={<FileManager />} />
            <Route path="/audioeditor" element={<AudioEditor />} />
            <Route path="/setup" element={<Setup />} />
              <Route path="/about" element={<About />} />
              <Route path="/addsong" element={<AddSong />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;