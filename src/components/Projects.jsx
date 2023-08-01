import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import projImg1 from '../assets/project-img1.png';
import projImg2 from '../assets/project-img2.png';
import projImg3 from '../assets/project-img3.png';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import '../style/Projects.css';

export const Projects = () => {
  const projects = [
    {
      title: 'Pong The Game App',
      description: 'Fullstack App for online PingPong',
      imgUrl: projImg1,
      link: 'http://www.pongthegame.rocks/'
    },
    {
      title: 'Contact Book App',
      description: 'Contact book React App with authentication',
      imgUrl: projImg2,
      link: 'http://209.38.216.33:9000/'
    },
    {
      title: 'Omio Like Search Bar',
      description: 'Clone of the main page of Omio.com with autocomplete',
      imgUrl: projImg3,
      link: 'http://209.38.216.33:5555/'
    }
  ];

  return (
    <section className="projects" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? 'animate__animated animate__pulse' : ''
                  }
                >
                  <h2>Projects</h2>
                  <p>My last web applications created with focus on ReactJS</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          {projects[0].title}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          {projects[1].title}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          {projects[2].title}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible
                          ? 'animate__animated animate__slideInUp'
                          : ''
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
