'use client';

import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import { ModeToggle } from './ModeToggle';
import { Profile } from '@/types';
import { User } from '@supabase/supabase-js';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
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
    <header className='relative flex justify-center items-center w-screen py-4 px-4'>
      <Link href='/'>
      <h2 className='text-lg font-semibold'>DailyDeals</h2>
      </Link>
      <div className='ml-auto flex w-full justify-end'>
        <NavigationMenu className='mr-4'>
          <NavigationMenuList>
            {user ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <HamburgerMenuIcon />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <LogoutButton />
                    {profile?.role === 1 && (
                      <>
                        <Link href='/create/business' legacyBehavior passHref>
                          <NavigationMenuLink
                            className={clsx('w-full', navigationMenuTriggerStyle())}
                          >
                            Create Business
                          </NavigationMenuLink>
                        </Link>
                        <Link href='/create/deal' legacyBehavior passHref>
                          <NavigationMenuLink
                            className={clsx('w-full', navigationMenuTriggerStyle())}
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
