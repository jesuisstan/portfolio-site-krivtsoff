import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import styles from '../style/Footer.module.css';
import SocialNetworkBlock from './SocialNetworkBlock';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="align-items-center">
          <Col className="d-none d-sm-block" sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div style={{ paddingTop: '20px' }}>
              <SocialNetworkBlock />
            </div>
            <p>
              {`Stan Krivtsoff portfolio site | `}
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
