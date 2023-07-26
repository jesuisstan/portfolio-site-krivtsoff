import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from './MenuDrawer';
import styles from '../../styles/Menu.module.css';
import LoadingButton from '@mui/lab/LoadingButton';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';

const Menu = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isUltraSmallScreen = useMediaQuery('(max-width:350px)');
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  return (
    <div>
      <nav className={styles.navbar}>
        {isSmallScreen ? (
          <IconButton
            sx={{ marginLeft: '42px' }}
            color="inherit"
            onClick={() => setMenuDrawerOpen(!menuDrawerOpen)}
          >
            <MenuIcon style={{ fill: colors.BOOK_BLACK }} />
          </IconButton>
        ) : (
          <div className={styles.left}>
            <NavLink to=".">Home</NavLink>
          </div>
        )}
        <div className={styles.right}>
          <div>
            <LoadingButton
              variant="contained"
              color="inherit"
              sx={MUI.LoadButton}
              onClick={() => {
                console.log('hello')
              }}
            >
              hi
            </LoadingButton>
          </div>
        </div>
        <MenuDrawer open={menuDrawerOpen} setOpen={setMenuDrawerOpen} />
      </nav>
    </div>
  );
};

export default Menu;
