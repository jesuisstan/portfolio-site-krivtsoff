import { SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import * as colors from '../../style/portfolioColors';
import * as MUI from '../../style/MUIstyles';

const MenuDrawer = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      PaperProps={{
        style: {
          backgroundColor: colors.PORTFOLIO_GREEN_TRANS
        }
      }}
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
    >
      <List sx={{ color: colors.PORTFOLIO_BLACK }}>
        <ListItem
          onClick={() => {
            navigate('/');
            setOpen(false);
          }}
        >
          <ListItemText primary="Home" disableTypography sx={MUI.burgerItem} />
        </ListItem>
        <ListItem
          onClick={() => {
            navigate('/contactbook');
            setOpen(false);
          }}
        >
          <ListItemText
            primary="Other page"
            disableTypography
            sx={MUI.burgerItem}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuDrawer;
