import siteMetadata from '@/data/siteMetadata';
import Link from 'next/link';
import Image from 'next/image';
import headerNavLinks from '@/data/headerNavLinks';

export default async function Header() {
  return (
    <header className='flex items-center justify-between py-10'>
      <div>
        <Link href='/' aria-label={siteMetadata.headerTitle}>
          <div className='flex items-center justify-between'>
            <div className='mr-3'>
              <Image width={53} height={43} priority src='/images/logo.svg' alt='Follow us on Twitter' />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className='hidden h-6 text-2xl font-semibold sm:block'>{siteMetadata.headerTitle}</div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className='flex items-center text-base leading-5'>
        <div className='hidden sm:block'>
          {headerNavLinks.map((link) => (
            <Link key={link.title} href={link.href} className='p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4'>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
