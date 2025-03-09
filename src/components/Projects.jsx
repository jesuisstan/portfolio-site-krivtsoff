'use client';

import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import styles from '@/styles/Projects.module.css';

export const Projects = () => {
  const projects = [
    {
      title: 'Hypertube Video Library',
      description: 'Free video streaming service and video library',
      imgUrl: '/projects/project-hypertube.png',
      link: 'https://hypertube-video-library.vercel.app'
    },
    {
      title: 'Matcha Dating App',
      description: 'Full-stack dating application',
      imgUrl: '/projects/project-matcha.png',
      link: 'https://matcha-find-your-date.vercel.app'
    },
    {
      title: 'Pong The Game',
      description: 'Full-stack App for online PingPong',
      imgUrl: '/projects/project-pong.png',
      link: 'https://github.com/jesuisstan/PongTheGame'
      //link: 'http://www.pongthegame.rocks/'
    },
    {
      title: 'Contact Book',
      description: 'Contact book React App with authentication',
      imgUrl: '/projects/project-contact.png',
      link: 'https://github.com/jesuisstan/ContactBookFullstackApp'
      //link: 'http://209.38.216.33:9090/'
    },
    {
      title: 'Info Map App',
      description: 'Application to display a map and Yelp Fusion API data',
      imgUrl: '/projects/project-map.png',
      link: 'https://github.com/jesuisstan/InfoMapApp'
      //link: 'http://209.38.216.33:5555/'
    }
  ];

  return (
    <section className={styles.projects} id="projects">
      <Container style={{ 'user-select': 'none' }}>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div>
                  <h2>Projects</h2>
                  <p>My last web applications</p>
                  <Tab.Container
                    id="projects-tabs"
                    defaultActiveKey="project-0"
                  >
                    <Nav
                      variant="pills"
                      className={`${styles.navPills} mb-5 justify-content-center align-items-center`}
                      id="pills-tab"
                    >
                      {projects.map((project, index) => (
                        <Nav.Item key={index}>
                          <Nav.Link
                            eventKey={`project-${index}`}
                            style={{ color: 'var(--foreground)' }}
                          >
                            {project.title}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>

                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? 'animate__animated animate__pulse' : ''
                      }
                    >
                      {projects.map((project, index) => (
                        <Tab.Pane eventKey={`project-${index}`} key={index}>
                          <ProjectCard {...project} />
                        </Tab.Pane>
                      ))}
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
