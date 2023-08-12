import Post from '@/components/post/Post';
import Pagination from '@/components/common/Pagination';
import { getPosts } from '@/lib/prisma/posts';
import { FunctionComponent } from 'react';
import SearchForm from '@/components/post/SearchForm';

interface PageProps {
  searchParams: {
    page?: string;
    searchValue?: string;
  };
}

const POSTS_PER_PAGE = 3;

const Page: FunctionComponent<PageProps> = async ({ searchParams }) => {
  const page = parseInt(searchParams.page || '1');
  const skip = page * POSTS_PER_PAGE - POSTS_PER_PAGE;

  const searchValue = searchParams.searchValue;

  const {
    posts = [],
    count = 0,
    error,
  } = await getPosts({
    take: POSTS_PER_PAGE,
    skip,
    where: {
      published: true,
      OR: [
        {
          title: {
            contains: searchValue,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchValue,
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  const totalPages = Math.ceil(count / POSTS_PER_PAGE);

  if (error) {
    throw error;
  }

  return (
    <div className='divide-y divide-gray-200 dark:divide-gray-700'>
      <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
          Бүх постууд
        </h1>
        <SearchForm searchValue={searchValue} />
      </div>
      <ul>
        {!posts.length && <div className='py-4'>Пост олдсонгүй.</div>}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={page} />
    </div>
  );
};

export default Page;
