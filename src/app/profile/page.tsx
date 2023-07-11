import { FunctionComponent } from 'react';
import Author from '@/components/Author';

interface PageProps {}

const Page: FunctionComponent<PageProps> = async () => {
  const signInUserId = 1;

  return <Author authorId={signInUserId} />;
};

export default Page;
