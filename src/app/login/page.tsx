import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

const Login = () => {
  return (
    <div className='lg:p-8'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
          <p className='text-sm text-muted-foreground'>
            Easily sign in with one of your accounts
          </p>
        </div>
        <div className='flex items-center justify-center'>
          <Link href='/auth/social/google' passHref legacyBehavior>
            <Button variant='outline' type='button'>
              Google
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
