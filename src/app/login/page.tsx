import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

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
        <div className='flex items-center justify-center gap-4'>
          <Link href='/auth/social/google' passHref legacyBehavior>
            <Button variant='outline' type='button'>
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </Link>
          <Link href='/auth/social/github' passHref legacyBehavior>
            <Button variant='outline' type='button'>
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
