import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import DealModule from '@/components/DealModule';
import LocationDialog from '@/components/LocationDialog';

import type { Database } from '@/db_types';
import { CityPageProps } from '@/types';
import { normalizeGeo } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function CityPage({ params }: CityPageProps) {
  const geo = params?.geo[0];
  if (!geo) {
    redirect('/');
  }

  const normalizedGeo = normalizeGeo(geo);
  const { city, region } = normalizedGeo;
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
          <LocationDialog {...normalizedGeo} />
        </div>

        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />
        <DealModule deals={deals} />
      </div>
    </div>
  );
}
