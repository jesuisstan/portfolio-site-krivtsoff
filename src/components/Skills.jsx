'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from '@/styles/Skills.module.css';

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

  return (
    <section className={styles.skill} id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/*<div className="skill-bx wow zoomIn">*/}
            <div className={styles.skillBx}>
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
                  //className="owl-carousel owl-theme skill-slider"
                >
                  <div className={styles.item}>
                    <h5>ReactJS</h5>
                    <img src="/logo-react.png" alt="ReactJS" height="100px" />
                  </div>
                  <div className={styles.item}>
                    <h5>Next.js</h5>
                    <img src="/logo-nextjs.png" alt="nextjs" height="100px" />
                  </div>
                  <div className={styles.item}>
                    <h5>Typescript</h5>
                    <img src="/logo-ts.png" alt="Typescript" height="100px" />
                  </div>
                  <div className={styles.item}>
                    <h5>Javascript</h5>
                    <img src="/logo-js.png" alt="Javascript" height="100px" />
                  </div>
                  <div className={styles.item}>
                    <h5>HTML</h5>
                    <img src="/logo-html.png" alt="html" height="100px" />
                  </div>
                  <div className={styles.item}>
                    <h5>CSS</h5>
                    <img src="/logo-css.png" alt="css" height="100px" />
                  </div>
                  <div className={styles.item}>
                    <h5>Material UI</h5>
                    <img
                      src="/logo-material-ui.png"
                      alt="material ui"
                      height="100px"
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Tailwindcss</h5>
                    <img
                      src="/logo-tailwindcss.png"
                      alt="Tailwindcss"
                      height="100px"
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Node.js</h5>
                    <img src="/logo-node.png" alt="node.js" height="100px" />
                  </div>
                  <div className={styles.item}>
                    <h5>Highcharts</h5>
                    <img
                      src="/logo-highcharts.png"
                      alt="node.js"
                      height="100px"
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>MongoDB</h5>
                    <img src="/logo-mongodb.png" alt="MongoDB" height="100px" />
                  </div>
                  <div className={styles.item}>
                    <h5>Git</h5>
                    <img src="/logo-git.png" alt="git" height="100px" />
                  </div>
                  <div className={styles.item}>
                    <h5>Docker</h5>
                    <img src="/logo-docker.png" alt="docker" height="100px" />
                  </div>
                </Carousel>
              </div>
              <p>
                <br />
                The actual github statistics:
                <br />
                <button
                  onClick={() =>
                    window.open(
                      `https://octoprofile.vercel.app/user?id=${process.env.NEXT_PUBLIC_GITHUB_PROFILE}`
                    )
                  }
                >
                  <span>Check out</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
