'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import emailjs from 'emailjs-com';
import Image from 'next/image';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [buttonText, setButtonText] = useState('Send Message');
  const [status, setStatus] = useState({});

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      value: process.env.NEXT_PUBLIC_CONTACT_LOCATION,
      href: null
    }
  ];

  const onFormUpdate = (category, value) => {
    setFormData({
      ...formData,
      [category]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email && formData.lastName && formData.message) {
      setButtonText('Sending...');
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          formData,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        );
        setButtonText('Send Message');
        setStatus({ success: true, message: 'Message sent successfully!' });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } catch (error) {
        setButtonText('Send Message');
        setStatus({
          success: false,
          message: 'Something went wrong, please try again later'
        });
      }
    } else {
      setStatus({
        success: false,
        message: 'Please fill in all required fields'
      });
    }
  };

  const handleTelegramClick = () => {
    // Open Telegram with username
    window.open(process.env.NEXT_PUBLIC_LINK_TELEGRAM, '_blank');
  };

  const handleWhatsAppClick = () => {
    // Open WhatsApp with phone number
    window.open(process.env.NEXT_PUBLIC_LINK_WHATSAPP, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold mb-8"
          >
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="space-y-12"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Get in Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg leading-relaxed">
                Ready to start a project or have a job opportunity? Send me a
                message and I'll respond as soon as possible.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl flex items-center justify-center">
                    <info.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      {info.title}
                    </h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-lg"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {info.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* QR Codes Section */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-semibold mb-6 text-xl text-gray-900 dark:text-white">
                Quick Connect
              </h4>
              <div className="grid grid-cols-2 gap-8">
                {/* Telegram QR Code */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-center"
                >
                  <motion.div
                    onClick={handleTelegramClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-32 h-32 mx-auto mb-4 bg-white rounded-xl p-2 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
                    title="Scan QR code or click to connect instantly via messenger"
                  >
                    <Image
                      src="/qrTelegram.jpg"
                      alt="Telegram QR Code"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/10 rounded-lg transition-colors duration-200 flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <MessageCircle className="w-8 h-8 text-blue-500" />
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Telegram
                    </span>
                  </div>
                </motion.div>

                {/* WhatsApp QR Code */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-center"
                >
                  <motion.div
                    onClick={handleWhatsAppClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-32 h-32 mx-auto mb-4 bg-white rounded-xl p-2 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
                    title="Scan QR code or click to connect instantly via messenger"
                  >
                    <Image
                      src="/qrWhatsApp.jpg"
                      alt="WhatsApp QR Code"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-green-500/0 hover:bg-green-500/10 rounded-lg transition-colors duration-200 flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <MessageCircle className="w-8 h-8 text-green-500" />
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      WhatsApp
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-semibold mb-6 text-xl text-gray-900 dark:text-white">
                Follow Me
              </h4>
              <div className="flex space-x-6">
                {[
                  {
                    name: 'GitHub',
                    href: process.env.NEXT_PUBLIC_LINK_GITHUB,
                    color: 'hover:text-gray-600'
                  },
                  {
                    name: 'LinkedIn',
                    href: process.env.NEXT_PUBLIC_LINK_LINKEDIN,
                    color: 'hover:text-blue-600'
                  },
                  {
                    name: 'Instagram',
                    href: process.env.NEXT_PUBLIC_LINK_INSTAGRAM,
                    color: 'hover:text-teal-400'
                  }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-gray-600 dark:text-gray-300 transition-colors duration-200 text-lg font-medium ${social.color}`}
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="glass-effect rounded-2xl p-10"
          >
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-3 text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => onFormUpdate('firstName', e.target.value)}
                    className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-lg"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-3 text-gray-900 dark:text-white"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => onFormUpdate('lastName', e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-lg"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-3 text-gray-900 dark:text-white"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => onFormUpdate('email', e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-lg"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-3 text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => onFormUpdate('phone', e.target.value)}
                    className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-lg"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-3 text-gray-900 dark:text-white"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => onFormUpdate('message', e.target.value)}
                  required
                  rows={8}
                  className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900 dark:text-white text-lg"
                  placeholder="Tell me about your project..."
                />
              </div>

              <p className="text-sm text-red-500">* Required fields</p>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="button-primary w-full py-4 text-lg font-semibold"
                disabled={buttonText === 'Sending...'}
              >
                {buttonText}
              </motion.button>

              {status.message && (
                <div
                  className={`text-center p-4 rounded-xl ${
                    status.success
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}
                >
                  {status.message}
                </div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
