import { FunctionComponent } from 'react';
import Author from '@/components/Author';
import { getServerSession } from 'next-auth';
import { nextOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

interface PageProps {}

const Page: FunctionComponent<PageProps> = async () => {
  const session = await getServerSession(nextOptions);

  if (!session) {
    redirect('/signin');
  }

  return <Author user={session.user} />;
};

export default Page;
