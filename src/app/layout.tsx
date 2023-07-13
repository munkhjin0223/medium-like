import Header from '@/components/Header';
import './globals.css';
import siteMetadata from '@/data/siteMetadata';

import { Inter } from 'next/font/google';
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0'>
          <div className='flex h-screen flex-col justify-between'>
            <Provider>
              <Header />
              <main className='mb-auto'>{children}</main>
            </Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
