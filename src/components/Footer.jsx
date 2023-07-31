import { Container } from 'react-bootstrap';
import SocialNetworkBlock from './SocialNetworkBlock';
import styles from '../style/Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <p>
            {`Stan Krivtsoff | web developer | Paris | 2023 | `}
            <a
              href="https://github.com/jesuisstan/portfolio-site-krivtsoff"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              @github
            </a>
          </p>
          <SocialNetworkBlock />
        </div>
      </Container>
    </footer>
  );
};
