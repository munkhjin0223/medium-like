'use client';

import { FunctionComponent } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  title: z
    .string({
      required_error: 'Гарчиг оруулна уу',
    })
    .max(50),
  content: z.string({
    required_error: 'Агуулга оруулна уу',
  }),
});

interface BlogFormProps {
  id?: string;
}

const BlogForm: FunctionComponent<BlogFormProps> = ({ id }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-3xl md:leading-14'>
        {id ? 'Блог засах' : 'Блог бичих'}
      </h1>
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
            name='content'
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
          <Button className='float-right' type='submit'>
            Хадгалах
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BlogForm;
