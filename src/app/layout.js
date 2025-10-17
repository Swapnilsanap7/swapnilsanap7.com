import SmoothScrollWrapper from '@/components/SmoothScrollWrapper';
import { Caveat } from 'next/font/google';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './globals.css';

const caveat = Caveat({ subsets: ['cyrillic'], weight: '700' });

export const metadata = {
  title: 'Swapnil Sanap',
  description: 'Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--light)] dark:bg-[var(--dark)] text-black dark:text-white transition-colors duration-500">
        <SmoothScrollWrapper>

        
        <Navbar />
        <main className="w-full max-w-screen mx-auto px-1 sm:px-6">
          {children}
        </main>
        <Footer />
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}
