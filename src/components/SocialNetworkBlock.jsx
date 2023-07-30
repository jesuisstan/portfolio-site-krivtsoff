import linkedinIcon from '../assets/linkedinIcon.svg';
import facebookIcon from '../assets/facebookIcon.svg';
import instagramIcon from '../assets/instagramIcon.svg';
import githubIcon from '../assets/githubIcon.svg';
import styles from '../style/SocialNetworkBlock.module.css';

const SocialNetworkBlock = () => {
  return (
    <div className={styles.socialIcon}>
      <a
        href={process.env.REACT_APP_LINK_GITHUB}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={githubIcon} alt="GITHUB" />
      </a>
      <a
        href={process.env.REACT_APP_LINK_LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={linkedinIcon} alt="LINKEDIN" />
      </a>
      <a
        href={process.env.REACT_APP_LINK_FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={facebookIcon} alt="FACEBOOK" />
      </a>
      <a
        href={process.env.REACT_APP_LINK_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={instagramIcon} alt="INSTAGRAM" />
      </a>
    </div>
  );
};

export default SocialNetworkBlock;
