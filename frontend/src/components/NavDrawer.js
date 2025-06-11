import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  styled,
  Divider,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { menuItems, NavigationMenu } from '../config/menuItems';
import { useTheme } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const NavDrawer = ({
  variant,
  open,
  onClose,
  drawerWidth,
  sx = {},
  onItemClick,
  onDrawerClose,
    darkMode
}) => {
  const theme = useTheme();

  const drawerColors = {
    dark: {
      background: '#190060',
      text: '#a4b3b6',
      hover: '#444444',
      divider: 'rgba(255, 255, 255, 0.12)'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      hover: '#e0e0e0',
      divider: 'rgba(0, 0, 0, 0.12)'
    }
  };

  const colors = darkMode ? drawerColors.dark : drawerColors.light;

  const drawer = (
    <div>
      <DrawerHeader>
        <IconButton onClick={onDrawerClose} sx={{ color: colors.text }}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ backgroundColor: colors.divider }} />
      <NavigationMenu onItemClick={onItemClick} colors={colors} />
    </div>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        ...sx,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          backgroundColor: colors.background,
          color: colors.text,
          '& .MuiListItemIcon-root': {
            color: colors.text
          },
          '& .MuiListItem-root': {
            '& a': {
              color: colors.text,
              textDecoration: 'none'
            },
            '&:hover': {
              backgroundColor: colors.hover
            }
          },
          '& a': {
            color: colors.text,
            textDecoration: 'none'
          },
          ...(sx['& .MuiDrawer-paper'] || {})
        }
      }}
    >
      {drawer}
    </Drawer>

  );
};

export default NavDrawer;