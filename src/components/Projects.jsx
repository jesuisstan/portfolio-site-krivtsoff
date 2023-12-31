'use client';

import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import styles from '@/styles/Projects.module.css';

export const Projects = () => {
  const projects = [
    {
      title: 'Pong The Game',
      description: 'Fullstack App for online PingPong',
      imgUrl: '/project-img1.png',
      link: 'https://github.com/jesuisstan/PongTheGame'
      //link: 'http://www.pongthegame.rocks/'
    },
    {
      title: 'Contact Book',
      description: 'Contact book React App with authentication',
      imgUrl: '/project-img2.png',
      link: 'https://github.com/jesuisstan/ContactBookFullstackApp'
      //link: 'http://209.38.216.33:9090/'
    },
    {
      title: 'Info Map App',
      description: 'Application to display a map and Yelp Fusion API data',
      imgUrl: '/project-img3.png',
      link: 'https://github.com/jesuisstan/InfoMapApp'
      //link: 'http://209.38.216.33:5555/'
    }
  ];

  return (
    <section className={styles.projects} id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div>
                  <h2>Projects</h2>
                  <p>My last web applications</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className={`${styles.navPills} mb-5 justify-content-center align-items-center`}
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link
                          eventKey="first"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {projects[0].title}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="second"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {projects[1].title}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="third"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {projects[2].title}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? 'animate__animated animate__pulse' : ''
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <ProjectCard {...projects[0]} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <ProjectCard {...projects[1]} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <ProjectCard {...projects[2]} />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
