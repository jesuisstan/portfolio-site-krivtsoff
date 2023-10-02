import styles from '../styles/SocialNetworkBlock.module.css'

const SocialNetworkBlock = () => {
  return (
    <div className={styles.socialIcon}>
      <a
        href={process.env.REACT_APP_LINK_GITHUB}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src='/icon-github.svg' alt="GITHUB" />
      </a>
      <a
        href={process.env.REACT_APP_LINK_LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src='/icon-linkedin.svg' alt="LINKEDIN" />
      </a>
      <a
        href={process.env.REACT_APP_LINK_FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src='/icon-facebook.svg' alt="FACEBOOK" />
      </a>
      <a
        href={process.env.REACT_APP_LINK_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src='/icon-instagram.svg' alt="INSTAGRAM" />
      </a>
    </div>
  );
};

export default SocialNetworkBlock;
