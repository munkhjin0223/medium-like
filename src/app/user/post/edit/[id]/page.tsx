import Form from '@/components/post/Form';
import { getPostById } from '@/lib/prisma/posts';
import { FunctionComponent } from 'react';

interface EditProps {
  params: Promise<{
    id: string;
  }>;
}

const Edit: FunctionComponent<EditProps> = async ({ params }) => {
  const { id } = await params;
  const { post } = await getPostById(id);

  return <Form post={post} />;
};

export default Edit;
