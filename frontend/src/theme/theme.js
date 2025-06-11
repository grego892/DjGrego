import { createTheme } from '@mui/material/styles';

export const createAppTheme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
  },
});