import { Prisma } from '@prisma/client';
import prisma from '.';

export async function getPosts(args: Prisma.PostFindManyArgs) {
  try {
    const result = await prisma.post.findMany(args);
    const count = await prisma.post.count();

    return { posts: result, count };
  } catch (error: any) {
    return { error };
  }
}

export async function getPostById(id: string) {
  try {
    const result = await prisma.post.findUnique({
      where: { id },
    });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
}

export async function createPost(data: Prisma.PostCreateInput) {
  try {
    const result = await prisma.post.create({ data });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
}

export async function updatePost(id: string, data: Prisma.PostUpdateInput) {
  try {
    const result = await prisma.post.update({
      where: { id },
      data,
    });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
}

export async function deletePost(id: string) {
  try {
    const result = await prisma.post.delete({
      where: { id },
    });

    return { post: result };
  } catch (error: any) {
    return { error };
  }
}
