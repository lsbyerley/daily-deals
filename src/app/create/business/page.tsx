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

    const { street, city, zipcode } = createData;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // check if business already exists
    const { data } = await supabase.from('businesses').select()
    .eq('street', street)
    .eq('city', city) 
    .eq('zipcode', zipcode)
    .single();

    if (data) {
      return { message: 'Business Already Exists' }
    }

    const { error } = await supabase
      .from('businesses')
      .insert(createData);

    if (error) {
      return { message: 'Business Creation Failed' }
    }

    return redirect('/');
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
