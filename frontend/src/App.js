import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme/theme';
import Header from './layouts/Header';
import NavDrawer from './components/NavDrawer';
import { routes } from './routes/index';
import { styled } from '@mui/material/styles';


const drawerWidth = 260;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  height: 'calc(100vh - 64px)',
  marginTop: 64,
  overflow: 'hidden',


  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  /* On mobile we keep the content full-width and don’t push it */
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
  },
}));


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
  sx={(theme) => ({
    width: { sm: drawerOpen ? drawerWidth : 0 },   // ← shrink when closed
    flexShrink: { sm: 0 },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  })}
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

          <Main open={drawerOpen}>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Main>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;