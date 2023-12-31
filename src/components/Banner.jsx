'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Download } from 'react-bootstrap-icons';
import Image from 'next/image';
import styles from '@/styles/Banner.module.css';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ['Web Developer', 'Frontend Developer', 'École 42 student'];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(100);
    }
  };

  const downloadCV = () => {
    window.open(`${process.env.NEXT_PUBLIC_LINK_CV_DOWNLOAD}`);
  };

  return (
    <section className={styles.banner} id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <div className={'animate__animated animate__pulse'}>
              <h2
                style={{ marginBottom: '10px' }}
              >{`My name is Stan Krivtsoff.`}</h2>
              <h2>
                {' '}
                <span className="txtRotate" dataperiod="500">
                  <span className="wrap">I am {text}</span>
                </span>
              </h2>
              <br />
              <p>
                Motivated and experienced individual with a proactive mindset,
                transitioning from 9 years of project management and business
                analysis to pursue an IT developer career. Successfully
                completed the two-year full-time Common Core education program
                at École 42 Paris. Specializing in web development with a focus
                on ReactJS.
              </p>
              <br />
              <button onClick={downloadCV}>
                CV <Download size={25} />
              </button>
            </div>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <div
              className={'animate__animated animate__pulse'}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                src="/avatar.jpg"
                alt="avatar"
                width="0"
                height="0"
                sizes="100vw"
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%'
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
