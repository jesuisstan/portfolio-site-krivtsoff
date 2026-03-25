# Stanislav Krivtsoff - Portfolio Website

A modern, responsive portfolio website showcasing my skills as a Frontend Developer. Built with Next.js, React, and modern web technologies.
The site is deployed on Vercel and can be accessed at [krivtsoff.site](https://krivtsoff.site).

## 🌟 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Dark/Light Theme**: Automatic theme switching with system preference detection
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized for speed and SEO
- **Animations**: Smooth scroll animations and micro-interactions using Framer Motion
- **Accessibility**: WCAG compliant with proper semantic HTML

## 🛠️ Technologies Used

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

### Styling & UI

- **shadcn/ui** - Modern component library
- **CSS Variables** - Dynamic theming
- **Glass Morphism** - Modern visual effects
- **Gradient Text** - Eye-catching typography

### Development Tools

- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jesuisstan/portfolio-site-krivtsoff.git
cd portfolio-site-krivtsoff
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```bash
# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_CONTACT_LOCATION=

# Social Media Links
NEXT_PUBLIC_LINK_GITHUB=https:/...
NEXT_PUBLIC_LINK_LINKEDIN=https://...
NEXT_PUBLIC_LINK_INSTAGRAM=https://...
NEXT_PUBLIC_LINK_TELEGRAM=https://t...
NEXT_PUBLIC_LINK_WHATSAPP=https://wa.me/...

# CV Download
NEXT_PUBLIC_LINK_CV_DOWNLOAD=...

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_USER_ID=...
```

Update these values with your actual contact information and social media links.

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.js       # Root layout with theme provider
│   └── page.js         # Home page
├── components/         # React components
│   ├── Banner.jsx      # Hero section
│   ├── Contact.jsx     # Contact form
│   ├── Experience.jsx  # Work experience timeline
│   ├── Footer.jsx      # Site footer
│   ├── NavBar.jsx      # Navigation bar
│   ├── Projects.jsx    # Projects showcase
│   ├── Skills.jsx      # Skills section
│   ├── Stats.jsx       # Statistics counter
│   └── TechStack.jsx   # Technology stack
├── lib/               # Utility functions
│   └── utils.js       # CSS class utilities
└── styles/            # Global styles
    └── globals.css    # Tailwind CSS and custom styles
```

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Secondary**: Muted grays for backgrounds
- **Accent**: Purple and pink gradients
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)

### Typography

- **Font**: Montserrat (Google Fonts)
- **Headings**: Bold weights with gradient text
- **Body**: Regular weight with good readability

### Animations

- **Page Transitions**: Smooth fade-in effects
- **Scroll Animations**: Staggered reveal animations
- **Hover Effects**: Scale and color transitions
- **Loading States**: Skeleton screens and spinners

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Website**: [krivtsoff.site](https://krivtsoff.site)
- **LinkedIn**: [linkedin.com/in/krivtsoff](https://linkedin.com/in/krivtsoff)
- **GitHub**: [github.com/jesuisstan](https://github.com/jesuisstan)

---

Made with ❤️ in Paris, France
