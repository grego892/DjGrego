import { createTheme } from '@mui/material/styles';

const getThemeColors = (darkMode) => ({
  appBar: {
    background: darkMode ? '#002660' : '#ffffff',
    text: darkMode ? '#a4b3b6' : '#000000',
  },
  drawer: {
    dark: {
      background: '#190060',
      text: '#a4b3b6',
      hover: '#444444',
      divider: 'rgba(255, 255, 255, 0.12)',
      active: '#2f1178'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      hover: '#e0e0e0',
      divider: 'rgba(0, 0, 0, 0.12)',
      active: '#e3f2fd'
    }
  }
});

export const createAppTheme = (darkMode) => {
  const colors = getThemeColors(darkMode);
  
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
    fontFamily: 'Roboto, Arial, sans-serif, HomeFont',
  },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.appBar.background,
            color: colors.appBar.text,
          },
        },
      },
    },
    custom: {
      drawer: darkMode ? colors.drawer.dark : colors.drawer.light,
    },
  });
};