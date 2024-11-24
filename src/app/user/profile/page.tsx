import { FunctionComponent } from 'react';
import Author from '@/components/Author';
import { auth } from '@/lib/auth';

interface PageProps {}

const Page: FunctionComponent<PageProps> = async () => {
  const session = await auth();

  return <Author user={session?.user} isEditable={true} />;
};

export default Page;
