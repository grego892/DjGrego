import React from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import {
  Drawer,
  IconButton,
  Divider
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { menuItems } from '../config/menuItems';

// Add this styled component at the top of your file
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const NavigationMenu = ({ onItemClick, colors, activeRoute, onNavigate }) => {
  return (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          key={item.path}
          className={activeRoute === item.path ? 'active' : ''}
          onClick={() => {
            if (onItemClick) onItemClick();
            if (onNavigate) onNavigate(item.path);
          }}
        >
          <Link to={item.path} style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

const NavDrawer = ({
  variant,
  open,
  onClose,
  drawerWidth,
  sx = {},
  onItemClick,
  onDrawerClose,
  darkMode,
  activeRoute,
  onNavigate
}) => {
  const theme = useTheme();

  const drawerColors = {
    dark: {
      background: '#190060',
      text: '#a4b3b6',
      hover: '#444444',
      divider: 'rgba(255, 255, 255, 0.12)',
      active: '#2f1178' // Add this line - darker shade for active item
    },
    light: {
      background: '#ffffffS',
      text: '#000000',
      hover: '#e0e0e0',
      divider: 'rgba(0, 0, 0, 0.12)',
      active: '#e3f2fd' // Add this line - lighter blue shade for active item
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
      <NavigationMenu 
        onItemClick={onItemClick} 
        colors={colors} 
        activeRoute={activeRoute}
        onNavigate={onNavigate}
      />
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
              textDecoration: 'none',
              width: '100%',
              padding: '8px 16px',
              display: 'block'
            },
            '&:hover': {
              backgroundColor: colors.hover
            },
            '&.active': {
              backgroundColor: colors.active
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