import Header from '@/components/Header';
import './globals.css';
import siteMetadata from '@/data/siteMetadata';

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0'>
      <div className='flex h-screen flex-col justify-between'>
        <Header />
        <main className='mb-auto'>{children}</main>
      </div>
    </div>
  );
}
