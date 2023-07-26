import { SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import * as colors from '../../styles/bookColors';
import * as MUI from '../../styles/MUIstyles';

const MenuDrawer = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      PaperProps={{
        style: {
          backgroundColor: colors.BOOK_GREEN_TRANS
        }
      }}
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
    >
      <List sx={{ color: colors.BOOK_BLACK }}>
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
