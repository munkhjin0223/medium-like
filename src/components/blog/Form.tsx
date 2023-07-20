'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Post } from '@prisma/client';
import { addPost, editPost, removePost } from '@/app/actions/posts';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z
    .string({
      required_error: 'Гарчиг оруулна уу',
    })
    .max(50),
  body: z.string({
    required_error: 'Агуулга оруулна уу',
  }),
});

interface BlogFormProps {
  post?: Post | null;
}

const BlogForm: FunctionComponent<BlogFormProps> = ({ post }) => {
  const router = useRouter();

  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title,
      body: post?.body,
    },
  });

  useEffect(() => {
    if (!infoMessage) return;

    const timeout = setTimeout(() => {
      setInfoMessage(null);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [infoMessage]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (post) {
      // Update
      editPost(post.id, values)
        .then(() => {
          setInfoMessage('Амжилттай хадгаллаа');
        })
        .catch((error) => {
          setInfoMessage(error.message);
        });
    } else {
      // Create
      addPost({
        ...values,
        userId: 1,
      })
        .then(({ post, error }) => {
          setInfoMessage('Амжилттай хадгаллаа');

          if (error) {
            throw new Error(error.message);
          }

          router.push(`/post/edit/${post?.id}`);
        })
        .catch((error) => {
          setInfoMessage(error.message);
        });
    }
  }

  function onDelete() {
    if (post) {
      if (confirm('Та устгахыг хүсч байна уу?'))
        removePost(post.id)
          .then(() => router.push('/profile'))
          .catch((error) => setInfoMessage(error.message));
    }
  }

  return (
    <>
      <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-3xl md:leading-14'>
        {post ? 'Блог засах' : 'Блог бичих'}
      </h1>
      {infoMessage && <div className='py-4 text-md text-sky-400'>{infoMessage}</div>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Гарчиг</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Гарчиг ойлгомжтой, товч, тодорхой байх хэрэгтэй.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Агуулга</FormLabel>
                <FormControl>
                  <Textarea className='h-96' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button onClick={onDelete} className='float-left' type='button' variant={'destructive'}>
              Устгах
            </Button>
            <Button className='float-right' type='submit'>
              Хадгалах
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default BlogForm;
