'use client';

import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import { ModeToggle } from './ModeToggle';
import { Profile } from '@/types';
import { User } from '@supabase/supabase-js';
import { Menu, CalendarDays } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import clsx from 'clsx';

interface HeaderProps {
  user?: User | null;
  profile?: Profile | null;
}

export default function Header(props: HeaderProps) {
  const { user, profile } = props;

  return (
    <header className='relative flex justify-center items-center w-screen px-6 py-3 border-b'>
      <Link href='/'>
        <div className='flex items-center'>
          <h2 className='text-sm font-semibold inline-flex items-center'>
            <span>Daily</span>
            <CalendarDays className='mx-1 h-[1.2rem] w-[1.2rem]' />
            <span>Deals</span>
          </h2>
        </div>
      </Link>
      <div className='ml-auto flex w-full justify-end'>
        <NavigationMenu className='mr-4'>
          <NavigationMenuList>
            {user ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Menu className='h-[1.2rem] w-[1.2rem]' />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <LogoutButton />
                    {profile?.role === 1 && (
                      <>
                        <Link href='/create/business' legacyBehavior passHref>
                          <NavigationMenuLink
                            className={clsx(
                              'w-full',
                              navigationMenuTriggerStyle()
                            )}
                          >
                            Create Business
                          </NavigationMenuLink>
                        </Link>
                        <Link href='/create/deal' legacyBehavior passHref>
                          <NavigationMenuLink
                            className={clsx(
                              'w-full',
                              navigationMenuTriggerStyle()
                            )}
                          >
                            Create Deal
                          </NavigationMenuLink>
                        </Link>
                      </>
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <Link href='/login' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </div>
    </header>
  );
}
