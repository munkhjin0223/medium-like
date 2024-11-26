import Author from '@/components/Author';
import { getUserById } from '@/lib/prisma/users';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

interface AuthorPageProps {
  params: Promise<{
    id: string;
  }>;
}

const AuthorPage: FunctionComponent<AuthorPageProps> = async ({ params }) => {
  const { id } = await params;
  const { user, error } = await getUserById(id);

  if (error) {
    throw new Error('Хэрэглэгчийн мэдээллийг унших үед алдаа гарлаа');
  }

  if (!user) {
    notFound();
  }

  return <Author user={user} />;
};

export default AuthorPage;
