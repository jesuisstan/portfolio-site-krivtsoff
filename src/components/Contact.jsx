'use client';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import styles from '../styles/Contact.module.css';
import * as colors from '../styles/portfolioColors';

export const Contact = () => {
  const [formDetails, setFormDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formDetails.email && formDetails.lastName && formDetails.message) {
      setButtonText('Sending...');
      try {
        await emailjs.send(
          //'YOUR_EMAILJS_SERVICE_ID',
          'service_iztcs2p',

          //'YOUR_EMAILJS_SERVICE_ID',
          'template_ds3he2l',

          formDetails,
          //'YOUR_EMAILJS_USER_ID'
          'DfVF4onMYhjgS2dsa'
        );
        setButtonText('Send');
        setStatus({ success: true, message: 'Message sent successfully' });
        setFormDetails({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } catch (error) {
        setButtonText('Send');
        setStatus({
          success: false,
          message: 'Something went wrong, please try again later'
        });
      }
    } else {
      setStatus({
        success: false,
        message: 'Fill in the required fields'
      });
    }
  };

  return (
    <section className={styles.contact} id="connect">
      <h2>Get In Touch</h2>
      <Container>
        <Row>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? 'animate__animated animate__fadeInLeft' : ''
                  }
                >
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name"
                          onChange={(e) =>
                            onFormUpdate('firstName', e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="* Last Name"
                          onChange={(e) =>
                            onFormUpdate('lastName', e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="* Email Address"
                          onChange={(e) =>
                            onFormUpdate('email', e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Phone No."
                          onChange={(e) =>
                            onFormUpdate('phone', e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="* Message"
                          onChange={(e) =>
                            onFormUpdate('message', e.target.value)
                          }
                        />
                        <p
                          style={{
                            opacity: '0.75',
                            color: colors.PORTFOLIO_RED_DANGER
                          }}
                        >
                          * required field
                        </p>
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                        {status.message && (
                          <Col>
                            <p
                              className={
                                status.success === false ? 'warning' : 'success'
                              }
                            >
                              {status.message}
                            </p>
                          </Col>
                        )}
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>

          <Col size={12} md={6}>
            <div className={styles.qrCodeBlock}>
              <div
                onClick={() =>
                  window.open(`${process.env.NEXT_PUBLIC_LINK_TELEGRAM}`)
                }
              >
                <h5>Telegram:</h5>
                <img
                  src="/qrTelegram.jpg"
                  alt="qrTelegramcode"
                  style={{
                    width: '150px',
                    height: '150px',
                    cursor: 'pointer'
                  }}
                />
              </div>
              <div
                onClick={() =>
                  window.open(`${process.env.NEXT_PUBLIC_LINK_WHATSAPP}`)
                }
              >
                <h5>WhatsApp:</h5>
                <img
                  src="/qrWhatsApp.jpg"
                  alt="qrWhatsAppcode"
                  style={{
                    width: '150px',
                    height: '150px',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
