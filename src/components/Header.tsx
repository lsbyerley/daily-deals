import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'
import LogoutButton from '@/components/LogoutButton';
import { ModeToggle } from './ModeToggle';

export default async function Header() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
      <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground'>
        <Link href='/' className='text-foreground'>
          DailyDeals
        </Link>
        {/*<Link href='/deals' className='text-foreground'>
          Deals
        </Link>
        <Link href='/admin' className='text-foreground'>
          Admin
        </Link>
        <Link href='/businesses' className='text-foreground'>
          Businesses
        </Link>*/}
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
