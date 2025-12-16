'use client';

import { Drawer, List, ListItem } from '@mui/material';
import { Nav } from 'react-bootstrap';

import * as colors from '../styles/portfolioColors';

const listItemStyle = {
  transition: 'color 0.1s ease-in-out',
  ':hover': {
    cursor: 'pointer',
    color: colors.PORTFOLIO_GREEN
  }
};

const MenuDrawer = ({ open, setOpen }) => {
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      PaperProps={{
        style: {
          backgroundColor: '#151515ef',
          width: '200px'
        }
      }}
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
      sx={{ zIndex: 11111 }}
    >
      <List sx={{ color: 'whitesmoke' }}>
        <ListItem
          sx={listItemStyle}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Nav.Link href="#home">Home</Nav.Link>
        </ListItem>

        <ListItem
          sx={listItemStyle}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Nav.Link href="#skills">Skills</Nav.Link>
        </ListItem>

        <ListItem
          sx={listItemStyle}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Nav.Link href="#projects">Projects</Nav.Link>
        </ListItem>
        <ListItem
          sx={listItemStyle}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Nav.Link href="#connect">Connect</Nav.Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuDrawer;
