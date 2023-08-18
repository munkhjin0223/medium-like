import { NextRequest, NextResponse } from 'next/server';
import { deletePost, getPostById, updatePost } from '@/lib/prisma/posts';

export async function PUT(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  const post = await getPostById(id);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const body = await request.json();

  const updatedPost = await updatePost(id, body);

  return NextResponse.json(updatedPost);
}

export async function DELETE(_request: NextRequest, { params: { id } }: { params: { id: string } }) {
  const post = await getPostById(id);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const deletedPost = await deletePost(id);

  return NextResponse.json(deletedPost);
}
