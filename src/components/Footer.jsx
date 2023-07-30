import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import styles from '../style/Footer.module.css';
import SocialNetworkBlock from './SocialNetworkBlock';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="align-items-center">
          <Col className="d-none d-sm-block">
            <div style={{ transform: 'scale(0.8)' }}>
              <SocialNetworkBlock />
            </div>
          </Col>
          <Col className="text-center text-sm-end">
            <p>
              {`Stan Krivtsoff | web developer | portfolio site | 2023 | `}
              <a
                href="https://github.com/jesuisstan/portfolio-site-krivtsoff"
                className={styles.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                @github
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
