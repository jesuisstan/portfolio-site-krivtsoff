'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle
} from 'lucide-react';
import emailjs from 'emailjs-com';
import Image from 'next/image';

const socialLinks = [
  {
    icon: Github,
    href: process.env.NEXT_PUBLIC_LINK_GITHUB,
    label: 'GitHub',
    color: 'hover:text-gray-400'
  },
  {
    icon: Linkedin,
    href: process.env.NEXT_PUBLIC_LINK_LINKEDIN,
    label: 'LinkedIn',
    color: 'hover:text-blue-300'
  },
  {
    icon: Instagram,
    href: process.env.NEXT_PUBLIC_LINK_INSTAGRAM,
    label: 'Instagram',
    color: 'hover:text-pink-400'
  },
  {
    icon: Facebook,
    href: process.env.NEXT_PUBLIC_LINK_FACEBOOK,
    label: 'Facebook',
    color: 'hover:text-blue-600'
  }
];

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
      className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-base leading-relaxed">
                Ready to start a project or have a job opportunity? Send me a
                message and I'll respond as soon as possible.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-gray-900 dark:text-white mb-1">
                      {info.title}
                    </h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">
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
              className="pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <motion.h4
                variants={itemVariants}
                className="font-semibold mb-4 text-lg text-gray-900 dark:text-white"
              >
                Quick Connect
              </motion.h4>
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-6"
              >
                {/* Telegram QR Code */}
                <motion.div variants={itemVariants} className="text-center">
                  <motion.div
                    onClick={handleTelegramClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-28 h-28 mx-auto mb-3 bg-white rounded-lg p-2 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200"
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
                        <MessageCircle className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-sm text-gray-900 dark:text-white">
                      Telegram
                    </span>
                  </div>
                </motion.div>

                {/* WhatsApp QR Code */}
                <motion.div variants={itemVariants} className="text-center">
                  <motion.div
                    onClick={handleWhatsAppClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-28 h-28 mx-auto mb-3 bg-white rounded-lg p-2 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200"
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
                        <MessageCircle className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-sm text-gray-900 dark:text-white">
                      WhatsApp
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <motion.h4
                variants={itemVariants}
                className="font-semibold mb-4 text-lg text-gray-900 dark:text-white"
              >
                Follow Me
              </motion.h4>
              <div className="flex justify-center md:justify-start space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.label}
                    onClick={
                      social.onClick ||
                      (() => window.open(social.href, '_blank'))
                    }
                    whileHover={{
                      scale: 1.15,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 shadow-md hover:shadow-lg transition-all duration-300 ${social.color}`}
                    title={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="glass-effect rounded-2xl p-8 h-fit"
          >
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => onFormUpdate('firstName', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
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
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
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
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => onFormUpdate('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => onFormUpdate('message', e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900 dark:text-white"
                  placeholder="Tell me about your project..."
                />
              </div>

              <p className="text-sm text-red-500">* Required fields</p>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="button-primary w-full py-3 text-base font-semibold"
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
