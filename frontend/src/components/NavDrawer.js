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
import { menuItems } from '../layouts/menuItems';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        item.items ? (
          <Accordion 
            key={item.text}
            sx={{
              backgroundColor: 'transparent',
              '&.MuiAccordion-root:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{
                '& .MuiAccordionSummary-expandIconWrapper': {
                  color: colors?.text
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {item.items.map((subItem) => (
                  <ListItem
                    key={subItem.text}
                    className={activeRoute === subItem.path ? 'active' : ''}
                    onClick={() => {
                      if (onItemClick) onItemClick();
                      if (onNavigate) onNavigate(subItem.path);
                    }}
                  >
                    <Link to={subItem.path} style={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ) : (
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
        )
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
  const colors = theme.custom.drawer;

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

export default NavDrawer;  // Add this line to export the NavDrawer component