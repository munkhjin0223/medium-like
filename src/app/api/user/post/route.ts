import { auth } from '@/lib/auth';
import { createPost } from '@/lib/prisma/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();

  const post = await request.json();

  const createdPost = await createPost({
    ...post,
    userId: session?.user.id,
  });

  return NextResponse.json(createdPost);
}
