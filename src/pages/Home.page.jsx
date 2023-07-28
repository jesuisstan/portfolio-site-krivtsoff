import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as MUI from '../style/MUIstyles';
import styles from '../style/HomePage.module.css';
import { useEffect, useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  const username = 'jesuisstan';
  const token = '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';

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }
  console.log(profileData);
  return (
    <div className={styles.main}>
      <img
        src={require('../assets/contactBook.png')}
        alt="ContactBook"
        className={styles.picture}
      />
      <div className={styles.textBlock}>
        <h1>My GitHub Profile</h1>
        <div>
          <p>
            <strong>Name:</strong> {profileData.name}
          </p>
          <p>
            <strong>Username:</strong> {profileData.login}
          </p>
          <p>
            <strong>Followers:</strong> {profileData.followers}
          </p>
          <p>
            <strong>Following:</strong> {profileData.following}
          </p>
          <p>
            <strong>Public Repositories:</strong> {profileData.public_repos}
          </p>
        </div>
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
