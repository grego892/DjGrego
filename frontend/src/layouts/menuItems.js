import HomeIcon from '@mui/icons-material/Home';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import TrafficIcon from '@mui/icons-material/Traffic';
import TwitterIcon from '@mui/icons-material/Twitter';
import CellTowerIcon from '@mui/icons-material/CellTower';
import ArticleIcon from '@mui/icons-material/Article';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AdbIcon from '@mui/icons-material/Adb';
import RadioIcon from '@mui/icons-material/Radio';



import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Separate reader items for the accordion
export const readerItems = [
  { text: 'Log Reader', icon: <ArticleIcon />, path: '/logReader' },
  { text: 'Asrun Reader', icon: <ReceiptIcon />, path: '/asrunReader' },
  { text: 'Debug Reader', icon: <AdbIcon />, path: '/debugReader' },
];

export const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Weather', icon: <ThunderstormIcon />, path: '/weather' },
  { text: 'Entergy Outage', icon: <ElectricalServicesIcon />, path: '/entergyoutage' },
  { text: 'Traffic', icon: <TrafficIcon />, path: '/traffic' },
  { text: 'Bird', icon: <TwitterIcon />, path: '/bird' },
  {
    text: 'Readers',
    icon: <CellTowerIcon />,
    items: readerItems,
    expandIcon: <ExpandMoreIcon />,
  },
  { text: 'DjGrego Radio', icon: <RadioIcon />, path: '/radio' },
];

export const NavigationMenu = ({ onItemClick, colors }) => {
  return (
    <List>
      {menuItems.map((item) => (
        item.items ? (
          <Accordion 
            key={item.text}
            sx={{
              backgroundColor: 'transparent',
              color: colors?.text,
              '&.MuiAccordion-root:before': {
                display: 'none', // Removes the default divider
              },
            }}
          >
            <AccordionSummary 
              expandIcon={item.expandIcon}
              sx={{
                '& .MuiAccordionSummary-expandIconWrapper': {
                  color: colors?.text
                }
              }}
            >
              <ListItemIcon sx={{ color: colors?.text }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {item.items.map((subItem) => (
                  <ListItem
                    key={subItem.text}
                    component={Link}
                    to={subItem.path}
                    onClick={onItemClick}
                    button
                  >
                    <ListItemIcon sx={{ color: colors?.text }}>{subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.text} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ) : (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={onItemClick}
            button
          >
            <ListItemIcon sx={{ color: colors?.text }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        )
      ))}
    </List>
  );
};