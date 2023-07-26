import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as MUI from '../styles/MUIstyles';
import styles from '../styles/HomePage.module.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <img
        src={require('../assets/contactBook.png')}
        alt="ContactBook"
        className={styles.picture}
      />
      <div className={styles.textBlock}>
        <h1>Welcome to Contact Book App!</h1>
        <ul className={styles.list}>
          <li>
            <h3>Create new contacts</h3>
            <br />
          </li>
          <li>
            <h3>Search through your contacts</h3>
            <br />
          </li>
          <li>
            <h3>Delete unwanted ones</h3>
          </li>
        </ul>
        <div>
          <LoadingButton
            endIcon={<ArrowForwardIosIcon />}
            variant="contained"
            color="inherit"
            sx={MUI.LoadButton}
            onClick={() => {
              navigate('/contactbook');
            }}
          >
            Start
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
