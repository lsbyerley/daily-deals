import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CreateDealForm from '@/components/CreateDealForm';
import { CreateDealStructure } from '@/types';

export const dynamic = 'force-dynamic';

export default async function CreateDeal() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: businesses } = await supabase.from('businesses').select().order('name', { ascending: true });

  const handleCreateDeal = async (createData: CreateDealStructure) => {
    'use server'
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { business, type, category, day } = createData;

    // check if deal already exists
    const { data } = await supabase.from('deals').select()
    .eq('business', business)
    .eq('type', type) 
    .eq('category', category)
    .eq('day', day)
    .single();

    if (data) {
      return { message: 'Deal Already Exists' }
    }

    const { error } = await supabase
      .from('deals')
      .insert(createData);

    if (error) {
      return { message: `Deal Creation Failed ${error}` }
    }

    return redirect('/create/deal/success');
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-8 lg:py-16 text-foreground w-full'>
        <h2 className='text-lg font-bold text-center'>Create Deal</h2>
        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />
        <div className='flex flex-col gap-8 text-foreground w-full'>
          <CreateDealForm businesses={businesses} createDeal={handleCreateDeal} />
        </div>
      </div>
    </div>
  );
}