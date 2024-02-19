import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CreateBusinessClient from '@/components/CreateBusinessClient';
import { CreateBusinessStructure } from '@/types';

export const dynamic = 'force-dynamic';

export default async function CreateBusiness() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const handleCreateBusiness = async (createData: CreateBusinessStructure) => {
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
      return { message: `Business Creation Failed: ${error}` }
    }

    return redirect('/create/business/success');
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-8 lg:py-16 text-foreground w-full'>
        <h2 className='text-lg font-bold text-center'>Create Business</h2>
        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />
        <div className='flex flex-col gap-8 text-foreground w-full'>
          <CreateBusinessClient createBusiness={handleCreateBusiness} />
        </div>
      </div>
    </div>
  );
}
