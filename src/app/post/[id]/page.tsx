import { FunctionComponent } from 'react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPostById, getPosts } from '@/lib/prisma/posts';
import Comment from '@/components/post/Comment';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  const { post } = await getPostById(id);

  return {
    title: post?.title,
    description: post?.body,
  };
}

export async function generateStaticParams() {
  const { posts = [] } = await getPosts({ take: 100 });

  return posts.map((post: any) => ({
    id: post.id,
  }));
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const { post, error } = await getPostById(id);

  if (error) {
    throw new Error(error.message);
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      <h1 className='text-2xl uppercase pb-2'>{post.title}</h1>
      <article>
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </article>
      <Comment />
    </>
  );
};

export default Page;
