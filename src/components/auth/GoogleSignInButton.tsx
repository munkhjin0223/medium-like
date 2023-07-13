'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const DiscordSignInButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <Button className='w-full' onClick={() => signIn('google', { callbackUrl })}>
      Continue with Google
    </Button>
  );
};

export default DiscordSignInButton;
