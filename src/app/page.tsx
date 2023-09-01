import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import LocationDialog from '@/components/LocationDialog';

import type { Database } from '@/db_types';
import { IndexPageProps } from '@/types';
import DealModule from '@/components/DealModule';

export const dynamic = 'force-dynamic';

export default async function Index({ searchParams }: IndexPageProps) {
  const city = searchParams.city;
  const region = searchParams.region;
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: deals } = await supabase
    .from('deals')
    .select('*, businesses!inner(*)')
    .eq('businesses.region', region)
    .eq('businesses.city', city);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-14 opacity-0 max-w-7xl px-3 py-16 lg:py-24 text-foreground'>
        <div className='flex justify-center items-center gap-4'>
          <h2 className='text-center text-foreground font-bold text-3xl'>
            {city}, {region}
          </h2>
          <LocationDialog />
        </div>

        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />
        <DealModule deals={deals} />
      </div>
    </div>
  );
}
