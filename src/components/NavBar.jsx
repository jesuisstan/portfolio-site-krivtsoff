import { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { HashLink } from 'react-router-hash-link';
import { BrowserRouter as Router } from 'react-router-dom';
import '../style/NavBar.css';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? 'scrolled' : ''}>
        <Container>
          <img src={logo} alt="Logo" style={{ minWidth: '250px' }} />
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                href="#home"
                className={
                  activeLink === 'home' ? 'active navbar-link' : 'navbar-link'
                }
                onClick={() => onUpdateActiveLink('home')}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#skills"
                className={
                  activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'
                }
                onClick={() => onUpdateActiveLink('skills')}
              >
                Skills
              </Nav.Link>
              <Nav.Link
                href="#projects"
                className={
                  activeLink === 'projects'
                    ? 'active navbar-link'
                    : 'navbar-link'
                }
                onClick={() => onUpdateActiveLink('projects')}
              >
                Projects
              </Nav.Link>
            </Nav>
            <span className="navbar-text" style={{ marginLeft: '30px' }}>
              {/*<SocialNetworkBlock />*/}
              <HashLink to="#connect">
                <button className="vvd">
                  <span>Let’s Connect</span>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
};
