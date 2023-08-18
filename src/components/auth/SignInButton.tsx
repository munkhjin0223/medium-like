'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

import ArrowRightOnRectangleIcon from '@heroicons/react/24/solid/ArrowRightOnRectangleIcon';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

const SignInButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Menubar className='border-0'>
          <MenubarMenu>
            <MenubarTrigger className='p-0'>
              {session?.user?.image ? (
                <div className='relative h-8 w-8'>
                  <Image
                    src={session.user.image}
                    alt={session.user.name || ''}
                    className='inline-block rounded-full'
                    fill
                  />
                </div>
              ) : (
                <span className='inline-block h-8 w-8 overflow-hidden rounded-full bg-stone-100'>
                  <svg className='h-full w-full text-stone-300' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                  </svg>
                </span>
              )}
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <div className='mb-4 flex gap-4 px-6 text-sm'>
                  {session?.user?.image ? (
                    <div className='relative h-10 w-10'>
                      <Image
                        src={session.user.image}
                        alt={session.user.name || ''}
                        className='inline-block rounded-full'
                        fill
                      />
                    </div>
                  ) : (
                    <span className='inline-block h-8 w-8 overflow-hidden rounded-full bg-stone-100'>
                      <svg className='h-full w-full text-stone-300' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                      </svg>
                    </span>
                  )}
                  <div>
                    <p className='font-medium text-stone-600'>{session.user?.name || 'User name'}</p>
                    <p className='text-stone-400'>{session.user?.email}</p>
                  </div>
                </div>
              </MenubarItem>
              <MenubarItem>
                <Link
                  href='/user/profile'
                  className={'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500'}
                >
                  <UserCircleIcon className='h-5 w-5 text-stone-400' />
                  <span>Профайл</span>
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link
                  href='/user/post/create'
                  className={'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500'}
                >
                  <PlusIcon className='h-5 w-5 text-stone-400' />
                  <span>Пост оруулах</span>
                </Link>
              </MenubarItem>

              <MenubarSeparator />
              <MenubarItem>
                <button
                  className={'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500'}
                  onClick={() => signOut()}
                >
                  <ArrowRightOnRectangleIcon className='h-5 w-5 text-stone-400' />
                  <span>Гарах</span>
                </button>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
        <button
          className='rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600'
          onClick={() => signIn()}
        >
          Нэвтрэх
        </button>
      )}
    </>
  );
};

export default SignInButton;
