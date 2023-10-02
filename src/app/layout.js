import '@/styles/globals.css';
import { Montserrat } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'krivtsoff.develop()',
  description: 'Generated by create next app',
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/apple-touch-icon.png'],
    shortcut: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}