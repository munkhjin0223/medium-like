'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const DiscordSignInButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <Button className='w-full bg-slate-600' onClick={() => signIn('discord', { callbackUrl })}>
      Continue with Discord
    </Button>
  );
};

export default DiscordSignInButton;
