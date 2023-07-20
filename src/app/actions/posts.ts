'use server';

import { createPost, updatePost, deletePost } from '@/lib/prisma/posts';
import { Prisma } from '@prisma/client';

export const addPost = async (post: Prisma.PostCreateInput) => {
  return createPost(post);
};

export const editPost = async (id: string, post: Prisma.PostUpdateInput) => {
  return updatePost(id, post);
};

export const removePost = async (id: string) => {
  return deletePost(id);
};
