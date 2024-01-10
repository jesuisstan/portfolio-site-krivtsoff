'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from '@/styles/Skills.module.css';
import Image from 'next/image';

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
                  className={styles.skillSlider}
                >
                  <div className={styles.item}>
                    <h5>ReactJS</h5>
                    <Image
                      src="/logo-react.png"
                      alt="ReactJS"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Next.js</h5>
                    <Image
                      src="/logo-nextjs.png"
                      alt="nextjs"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Typescript</h5>
                    <Image
                      src="/logo-ts.png"
                      alt="Typescript"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Javascript</h5>
                    <Image
                      src="/logo-js.png"
                      alt="Javascript"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>HTML</h5>
                    <Image
                      src="/logo-html.png"
                      alt="html"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>CSS</h5>
                    <Image
                      src="/logo-css.png"
                      alt="css"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Material UI</h5>
                    <Image
                      src="/logo-material-ui.png"
                      alt="material ui"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Tailwindcss</h5>
                    <Image
                      src="/logo-tailwindcss.png"
                      alt="Tailwindcss"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Node.js</h5>
                    <Image
                      src="/logo-node.png"
                      alt="node.js"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>GraphQL</h5>
                    <Image
                      src="/logo-graph-ql.png"
                      alt="graph-ql"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Apollo</h5>
                    <Image
                      src="/logo-apollo.png"
                      alt="apollol"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Highcharts</h5>
                    <Image
                      src="/logo-highcharts.png"
                      alt="highcharts"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>MongoDB</h5>
                    <Image
                      src="/logo-mongodb.png"
                      alt="MongoDB"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Git</h5>
                    <Image
                      src="/logo-git.png"
                      alt="git"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
                  </div>
                  <div className={styles.item}>
                    <h5>Docker</h5>
                    <Image
                      src="/logo-docker.png"
                      alt="docker"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px'
                      }}
                    />
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
