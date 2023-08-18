import { FunctionComponent } from 'react';
import Author from '@/components/Author';
import { getServerSession } from 'next-auth';
import { nextOptions } from '@/lib/auth';

interface PageProps {}

const Page: FunctionComponent<PageProps> = async () => {
  const session = await getServerSession(nextOptions);

  return <Author user={session?.user} isEditable={true} />;
};

export default Page;
