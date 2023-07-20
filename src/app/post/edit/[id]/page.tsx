import Form from '@/components/blog/Form';
import { getPostById } from '@/lib/prisma/posts';
import { Post } from '@prisma/client';
import { FunctionComponent } from 'react';

interface EditProps {
  params: {
    id: string;
  };
}

const Edit: FunctionComponent<EditProps> = async ({ params: { id } }) => {
  const { post } = await getPostById(id);

  return <Form post={post} />;
};

export default Edit;
