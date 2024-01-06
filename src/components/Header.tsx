import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import { ModeToggle } from './ModeToggle';
import { Profile } from '@/types';
import { User } from '@supabase/supabase-js';

interface HeaderProps {
  user?: User | null
  profile?: Profile | null
}

export default async function Header(props: HeaderProps) {
  const { user, profile } = props;

  return (
    <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
      <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground'>
        <Link href='/' className='text-foreground'>
          DailyDeals
        </Link>
        {profile?.role === 1 && (
          <>
            <Link href='/create/business' className='text-foreground'>
              Create Biz
            </Link>
            <Link href='/create/deal' className='text-foreground'>
            Create Deal
            </Link>
          </>
        )}
        <div>
          {user ? (
            <div className='flex items-center gap-4'>
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link href='/login' className='text-foreground'>
              Login
            </Link>
          )}
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
