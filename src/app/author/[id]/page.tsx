import Author from '@/components/Author';
import { FunctionComponent } from 'react';

interface AuthorPageProps {
  params: {
    id: string;
  };
}

const AuthorPage: FunctionComponent<AuthorPageProps> = ({ params: { id } }) => {
  return <Author authorId={parseInt(id)} />;
};

export default AuthorPage;
