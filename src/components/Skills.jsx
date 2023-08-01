import logoJS from '../assets/logo-js.png';
import logoTS from '../assets/logo-ts.png';
import logoGit from '../assets/logo-git.png';
import logoHTML from '../assets/logo-html.png';
import logoDocker from '../assets/logo-docker.png';
import logoCSS from '../assets/logo-css.png';
import logoNodeJS from '../assets/logo-node.png';
import logoMaterialUI from '../assets/logo-material-ui.png';
import logoBootstrap from '../assets/logo-bootstrap.png';
import logoMongoDB from '../assets/logo-mongodb.png';
import logoReact from '../assets/logo-react.png';
import Carousel from 'react-multi-carousel';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'react-multi-carousel/lib/styles.css';
import '../style/Skills.css';

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const proceedToOctoprofile = () => {
    window.open(
      `https://octoprofile.vercel.app/user?id=${process.env.REACT_APP_GITHUB_PROFILE}`
    );
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p>
                Possessing the essential knowledge of web and related
                technologies
                <br />
                required to develop contemporary, responsive, and fully
                functional web applications
              </p>
              <div style={{ margin: '41px' }}>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  className="owl-carousel owl-theme skill-slider"
                >
                  <div className="item">
                    <h5>ReactJS</h5>
                    <img src={logoReact} alt="ReactJS" />
                  </div>
                  <div className="item">
                    <h5>Typescript</h5>
                    <img src={logoTS} alt="Typescript" />
                  </div>
                  <div className="item">
                    <h5>Javascript</h5>
                    <img src={logoJS} alt="Javascript" />
                  </div>
                  <div className="item">
                    <h5>HTML</h5>
                    <img src={logoHTML} alt="html" />
                  </div>
                  <div className="item">
                    <h5>CSS</h5>
                    <img src={logoCSS} alt="css" />
                  </div>
                  <div className="item">
                    <h5>Material UI</h5>
                    <img src={logoMaterialUI} alt="material ui" />
                  </div>
                  <div className="item">
                    <h5>Bootstrap</h5>
                    <img src={logoBootstrap} alt="Bootstrap" />
                  </div>
                  <div className="item">
                    <h5>Node.js</h5>
                    <img src={logoNodeJS} alt="node.js" />
                  </div>
                  <div className="item">
                    <h5>MongoDB</h5>
                    <img src={logoMongoDB} alt="MongoDB" />
                  </div>
                  <div className="item">
                    <h5>Git</h5>
                    <img src={logoGit} alt="git" />
                  </div>
                  <div className="item">
                    <h5>Docker</h5>
                    <img src={logoDocker} alt="docker" />
                  </div>
                </Carousel>
              </div>
              <p>
                <br />
                The actual github statistics:
                <br />
                <button type="submit">
                  <span>Check out</span>
                </button>
                {/*<ArrowRightCircle size={22} style={{cursor: 'pointer'}} onClick={proceedToOctoprofile}/>*/}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
