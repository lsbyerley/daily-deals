import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers';
import DealModule from '@/components/DealModule';
import LocationDialog from '@/components/LocationDialog';

import { CityPageProps } from '@/types';
import { buildGeoFromParams } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function CityPage({ params }: CityPageProps) {
  const geo = buildGeoFromParams(params);
  const { city, region } = geo;

  if (!city || !region) {
    return <p className='text-foreground mt-8'>City and/or State Not Recognized</p>
  };

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: deals } = await supabase
    .from('deals')
    .select('*, businesses!inner(*)')
    .eq('businesses.region', region)
    .eq('businesses.city', city);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-14 opacity-0 max-w-7xl px-3 py-16 lg:py-24 text-foreground w-full'>
        <div className='flex justify-center items-center gap-4'>
          <h2 className='text-center text-foreground font-bold text-3xl'>
            {city}, {region}
          </h2>
          <LocationDialog {...geo} />
        </div>

        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />
        <DealModule deals={deals} />
      </div>
    </div>
  );
}