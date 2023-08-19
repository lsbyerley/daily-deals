import Link from 'next/link';

export default async function Footer() {
  return (
    <div className='h-16 flex justify-center text-center text-xs'>
      <p>
        Powered by{' '}
        <Link
          href='https://supabase.com/'
          target='_blank'
          className='font-bold'
        >
          Supabase
        </Link>
      </p>
    </div>
  );
}
