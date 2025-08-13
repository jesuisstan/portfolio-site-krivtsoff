'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import Image from 'next/image';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@krivtsoff.me',
      href: 'mailto:contact@krivtsoff.me'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+33 6 12 34 56 78',
      href: 'tel:+33612345678'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Paris, France',
      href: null
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const handleTelegramClick = () => {
    // Open Telegram with username
    window.open('https://t.me/jesuisstan', '_blank');
  };

  const handleWhatsAppClick = () => {
    // Open WhatsApp with phone number
    const phoneNumber = '+33766836729';
    const message =
      'Hello! I saw your portfolio and would like to discuss a project.';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      /\s/g,
      ''
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold mb-8"
          >
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can work together!
          </motion.p>
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
                Ready to start a project or just want to chat? I'd love to hear
                from you. Send me a message and I'll respond as soon as
                possible.
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
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center">
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
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-base">
                Scan QR codes or click to connect instantly via messaging apps
              </p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    @jesuisstan
                  </p>
                  <p className="text-xs text-blue-500 mt-1 font-medium">
                    Click to open
                  </p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    +33 7 66 83 67 29
                  </p>
                  <p className="text-xs text-green-500 mt-1 font-medium">
                    Click to open
                  </p>
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
                    href: 'https://github.com/jesuisstan',
                    color: 'hover:text-gray-600'
                  },
                  {
                    name: 'LinkedIn',
                    href: 'https://linkedin.com/in/krivtsoff',
                    color: 'hover:text-blue-600'
                  },
                  {
                    name: 'Instagram',
                    href: 'https://www.instagram.com/je.suis.stan/',
                    color: 'hover:text-blue-400'
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
                    htmlFor="name"
                    className="block text-sm font-medium mb-3 text-gray-900 dark:text-white"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-lg"
                    placeholder="Your name"
                  />
                </div>
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
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-lg"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-3 text-gray-900 dark:text-white"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-lg"
                  placeholder="What's this about?"
                />
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
                  onChange={handleInputChange}
                  required
                  rows={8}
                  className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900 dark:text-white text-lg"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center space-x-3 p-6 rounded-xl ${
                    submitStatus === 'success'
                      ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                      : 'bg-red-500/10 text-red-600 border border-red-500/20'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <AlertCircle className="w-6 h-6" />
                  )}
                  <span className="text-lg">
                    {submitStatus === 'success'
                      ? "Message sent successfully! I'll get back to you soon."
                      : 'Something went wrong. Please try again.'}
                  </span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full button-primary flex items-center justify-center space-x-3 py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
