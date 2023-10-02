'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import 'animate.css';
import avatar from '../../public/avatar.jpg';
import TrackVisibility from 'react-on-screen';
import { Download } from 'react-bootstrap-icons';
//import '../style/Banner.css';

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
    window.open(`${process.env.LINK_CV_DOWNLOAD}`);
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <div className={'animate__animated animate__pulse'}>
              <h2>{`Salut! I am Stan Krivtsoff,`}</h2>
              <h2>
                {' '}
                <span className="txtRotate" dataPeriod="500">
                  <span className="wrap">{text}</span>
                </span>
              </h2>
              <p>
                Motivated and experienced individual with a proactive mindset,
                transitioning from 9 years of project management and business
                analysis to pursue an IT developer career. Successfully
                completed the two-year full-time Common Core education program
                at École 42 Paris. Specializing in web development with a focus
                on ReactJS.
              </p>
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
              <img
                src="/avatar.jpg"
                alt="avatar"
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
