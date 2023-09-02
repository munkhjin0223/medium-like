'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Post } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Editor from '../common/Editor';
import { Label } from '../ui/label';
import Image from 'next/image';

const formSchema = z.object({
  title: z
    .string({
      required_error: 'Гарчиг оруулна уу',
    })
    .max(50),
  description: z.string(),
  published: z.boolean(),
});

interface BlogFormProps {
  post?: Post | null;
}

const BlogForm: FunctionComponent<BlogFormProps> = ({ post }) => {
  const router = useRouter();

  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [body, setBody] = useState(post?.body || '');
  const [coverImage, setCoverImage] = useState(post?.coverImage || '');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title,
      description: post?.description || '',
      published: post?.published || false,
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
    const finalValues = {
      ...values,
      publishedAt: values.published ? new Date() : null,
      body,
      coverImage,
    };

    if (post) {
      // Update
      fetch(`/api/user/post/${post.id}`, { method: 'PUT', body: JSON.stringify(finalValues) })
        .then(() => {
          setInfoMessage('Амжилттай хадгаллаа');
        })
        .catch((error) => {
          setInfoMessage(error.message);
        });
    } else {
      // Create
      fetch('/api/user/post', {
        method: 'POST',
        body: JSON.stringify(finalValues),
      })
        .then((res) => res.json())
        .then(({ post, error }) => {
          setInfoMessage('Амжилттай хадгаллаа');

          if (error) {
            throw new Error(error.message);
          }

          router.push(`/user/post/edit/${post?.id}`);
        })
        .catch((error) => {
          setInfoMessage(error.message);
        });
    }
  }

  function onDelete() {
    if (post) {
      if (confirm('Та устгахыг хүсч байна уу?'))
        fetch(`/api/user/post/${post.id}`, { method: 'DELETE' })
          .then(() => router.push('/user/profile'))
          .catch((error) => setInfoMessage(error.message));
    }
  }

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formDate = new FormData();
    formDate.append('file', file);

    fetch('/api/upload', {
      method: 'POST',
      body: formDate,
    }).then((res) => {
      res.json().then(({ url }) => {
        setCoverImage(url);
      });
    });
  };

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
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='picture'>Зураг</Label>
            <Input id='picture' type='file' onChange={onChangeFile} />
            {coverImage && <Image src={coverImage} alt={'Cover image'} width={200} height={200} />}
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Хураангуй</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='published'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Нийтлэх эсэх</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Editor body={body} setBody={setBody} />
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
