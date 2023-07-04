import Header from '@/components/Header';

export default async function Layout({ children }: any) {
  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0'>
      <div className='flex h-screen flex-col justify-between'>
        <Header />
        <main className='mb-auto'>{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
