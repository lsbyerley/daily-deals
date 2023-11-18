import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CreateBusinessClient from '@/components/CreateBusinessClient';

export const dynamic = 'force-dynamic';

export default async function CreateBusiness() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('LOG: not logged, redirect');
    redirect('/login');
  }

  // TODO: createData type interface
  const handleCreateBusiness = async (createData: any) => {
    'use server'

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('businesses')
      .insert(createData);

    alert('Business Created Succesfully!');
    redirect('/');
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground w-full'>
        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />

        <div className='flex flex-col gap-8 text-foreground w-full'>
          <h2 className='text-lg font-bold text-center'>Create Business</h2>
          <CreateBusinessClient createBusiness={handleCreateBusiness} />
        </div>
      </div>
    </div>
  );
}
