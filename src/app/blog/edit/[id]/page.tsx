import Form from '@/components/blog/Form';
import { FunctionComponent } from 'react';

interface EditProps {
  params: {
    id: string;
  };
}

const Edit: FunctionComponent<EditProps> = ({ params: { id } }) => {
  return <Form id={id} />;
};

export default Edit;
