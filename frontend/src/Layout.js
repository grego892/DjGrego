import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme/theme';
import Header from './layouts/Header';
import NavDrawer from './components/NavDrawer';
import { routes } from './routes/index';

const drawerWidth = 240;

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createAppTheme(darkMode);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          
          <Header 
            drawerWidth={drawerWidth}
            onDrawerToggle={handleDrawerToggle}
            darkMode={darkMode}
            onDarkModeToggle={handleDarkModeToggle}
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
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { 
                  boxSizing: 'border-box', 
                  width: drawerWidth 
                },
              }}
            />
            
            {/* Desktop drawer */}
            <NavDrawer
              variant="permanent"
              open
              drawerWidth={drawerWidth}
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { 
                  boxSizing: 'border-box', 
                  width: drawerWidth 
                },
              }}
            />
          </Box>

          <Box
            component="main"
            sx={{ 
              flexGrow: 1, 
              p: 3, 
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              marginTop: '64px'
            }}
          >
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default Layout;