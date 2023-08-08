import { createPost } from '@/lib/prisma/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { nextOptions } from '../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  const session = await getServerSession(nextOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const post = await request.json();

  const createdPost = await createPost({
    ...post,
    userId: session.user.id,
  });

  return NextResponse.json(createdPost);
}
