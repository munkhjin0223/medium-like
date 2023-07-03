import Link from 'next/link';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  const posts: Post[] = await res.json();

  return (
    <div className='divide-y divide-gray-200 dark:divide-gray-700'>
      <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
          Latest
        </h1>
        <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
          A blog created with Next.js and Tailwind.css
        </p>
      </div>
      <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
        {!posts.length && 'No posts found.'}
        {posts.map((post) => {
          const { id, title, body } = post;

          return (
            <li key={id} className='py-12'>
              <article>
                <div className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                  <dl>
                    <dt className='sr-only'>Published on</dt>
                    <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                      <time dateTime={'2000-01-01'}>2000-01-01</time>
                    </dd>
                  </dl>
                  <div className='space-y-5 xl:col-span-3'>
                    <div className='space-y-6'>
                      <div>
                        <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                          <Link href={`/blog/${id}`} className='text-gray-900 dark:text-gray-100'>
                            {title}
                          </Link>
                        </h2>
                      </div>
                      <div className='prose max-w-none text-gray-500 dark:text-gray-400'>{body}</div>
                    </div>
                    <div className='text-base font-medium leading-6'>
                      <Link
                        href={`/blog/${id}`}
                        className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                        aria-label={`Read "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
