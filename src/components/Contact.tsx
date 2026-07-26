'use client';

import { useEffect, useRef, useState } from 'react';

import emailjs from 'emailjs-com';
import type { Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle
} from 'lucide-react';
import Image from 'next/image';
import type { FormEvent } from 'react';

import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import Separator from '@/components/ui/separator';
import ShineBorder from '@/components/ui/shine-border';
import Textarea from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ContactSocialLink {
  icon: LucideIcon;
  href: string | undefined;
  label: string;
}

interface ContactInfoItem {
  icon: LucideIcon;
  title: string;
  value: string | undefined;
  href: string | null;
}

interface ContactMessenger {
  label: string;
  href: string | undefined;
  qrCode: string;
  /** Literal token class for the service's brand colour — Tailwind only compiles class names it can read as text. */
  tint: string;
}

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

interface ContactFormStatus {
  success?: boolean;
  message?: string;
}

const socialLinks: ContactSocialLink[] = [
  {
    icon: Github,
    href: process.env.NEXT_PUBLIC_LINK_GITHUB,
    label: 'GitHub'
  },
  {
    icon: Linkedin,
    href: process.env.NEXT_PUBLIC_LINK_LINKEDIN,
    label: 'LinkedIn'
  },
  {
    icon: Instagram,
    href: process.env.NEXT_PUBLIC_LINK_INSTAGRAM,
    label: 'Instagram'
  },
  {
    icon: Facebook,
    href: process.env.NEXT_PUBLIC_LINK_FACEBOOK,
    label: 'Facebook'
  }
];

const messengers: ContactMessenger[] = [
  {
    label: 'Telegram',
    href: process.env.NEXT_PUBLIC_LINK_TELEGRAM,
    qrCode: '/qrTelegram.jpg',
    tint: 'text-brand-telegram'
  },
  {
    label: 'WhatsApp',
    href: process.env.NEXT_PUBLIC_LINK_WHATSAPP,
    qrCode: '/qrWhatsApp.jpg',
    tint: 'text-brand-whatsapp'
  }
];

/** Contact section with details, messenger QR codes, and an EmailJS form. */
const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID!);
  }, []);

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [buttonText, setButtonText] = useState('Send Message');
  const [status, setStatus] = useState<ContactFormStatus>({});

  const contactInfo: ContactInfoItem[] = [
    {
      icon: MapPin,
      title: 'Location',
      value: process.env.NEXT_PUBLIC_CONTACT_LOCATION,
      href: null
    }
  ];

  const onFormUpdate = (category: keyof ContactFormData, value: string) => {
    setFormData({
      ...formData,
      [category]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email && formData.lastName && formData.message) {
      setButtonText('Sending...');
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
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
      } catch {
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
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
      aria-labelledby="contact-heading"
      className="bg-background py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-12 text-center"
        >
          <motion.h2
            id="contact-heading"
            variants={itemVariants}
            className="mb-8 text-4xl font-bold text-foreground lg:text-5xl"
          >
            Let&apos;s <span className="text-primary">Connect</span>
          </motion.h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                Ready to start a project or have a job opportunity? Send me a
                message and I&apos;ll respond as soon as possible.
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
                  className="flex items-center gap-4"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <info.icon aria-hidden className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-semibold text-foreground">
                      {info.title}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* QR Codes Section */}
            <motion.div variants={itemVariants}>
              <Separator className="mb-6" />
              <motion.h3
                variants={itemVariants}
                className="mb-4 text-lg font-semibold text-foreground"
              >
                Quick Connect
              </motion.h3>
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-6"
              >
                {messengers.map((messenger) => (
                  <motion.div
                    key={messenger.label}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <a
                      href={messenger.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Scan QR code or click to connect instantly via messenger"
                      className="group relative mx-auto mb-3 block size-28 rounded-lg bg-card shadow-ambient transition-shadow hover:shadow-raised focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <Image
                        src={messenger.qrCode}
                        alt={`${messenger.label} QR Code`}
                        fill
                        sizes="112px"
                        className="rounded-lg object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary/0 transition-colors group-hover:bg-primary/15">
                        <MessageCircle
                          aria-hidden
                          className={cn(
                            'size-6 opacity-0 transition-opacity group-hover:opacity-100',
                            messenger.tint
                          )}
                        />
                      </span>
                    </a>
                    <div className="mb-1 flex items-center justify-center gap-2">
                      <MessageCircle
                        aria-hidden
                        className={cn('size-4', messenger.tint)}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {messenger.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <Separator className="mb-6" />
              <motion.h3
                variants={itemVariants}
                className="mb-4 text-lg font-semibold text-foreground"
              >
                Follow Me
              </motion.h3>
              <div className="flex justify-center gap-4 md:justify-start">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    asChild
                    variant="outline"
                    size="icon-lg"
                    className="size-12"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="size-6" />
                    </a>
                  </Button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <Card className="relative h-fit overflow-hidden p-6 sm:p-8">
              <ShineBorder
                borderWidth={1}
                duration={14}
                shineColor={['var(--primary)', 'var(--primary-alt)']}
              />
              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        onFormUpdate('firstName', e.target.value)
                      }
                      className="h-11"
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => onFormUpdate('lastName', e.target.value)}
                      required
                      className="h-11"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => onFormUpdate('email', e.target.value)}
                      required
                      className="h-11"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => onFormUpdate('phone', e.target.value)}
                      className="h-11"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => onFormUpdate('message', e.target.value)}
                    required
                    rows={6}
                    className="resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  * Required fields
                </p>

                <Button
                  type="submit"
                  className="h-11 w-full text-base font-semibold"
                  disabled={buttonText === 'Sending...'}
                >
                  {buttonText}
                </Button>

                {status.message && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={cn(
                      'rounded-lg border p-4 text-center text-sm',
                      status.success
                        ? 'border-primary/40 bg-primary/10 text-foreground'
                        : 'border-destructive/40 bg-destructive/10 text-destructive'
                    )}
                  >
                    {status.message}
                  </p>
                )}
              </motion.form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
