import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import DealCard from '@/components/DealCard';

import type { Database } from '@/db_types';
export type Deal = Database['public']['Tables']['deals']['Row'];

interface DealsPageProps {
  params: Object;
  searchParams: {
    city: String;
    country: String;
    region: String;
  };
}

export const dynamic = 'force-dynamic';

export default async function Index({ searchParams }: DealsPageProps) {
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    new Date()
  );
  const city = searchParams.city;
  const region = searchParams.region;
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: deals } = await supabase
    .from('deals')
    .select('*, businesses(*)')
    .eq('businesses.city', city)
    .eq('businesses.state', region);

  const todayDeals =
    deals?.filter((deal) => deal.type === 'daily' && deal.day?.includes(today)) || [];
  const everydayDeals = deals?.filter((deal) => deal.type === 'everyday') || [];

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-14 opacity-0 max-w-7xl px-3 py-16 lg:py-24 text-foreground'>
        <h2 className='text-center text-foreground font-bold text-xl'>
          {city}, {region}
        </h2>

        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />

        <div className='flex flex-col gap-8 text-foreground'>
          <h2 className='text-lg font-bold text-center'>{today} Deals</h2>
          {todayDeals.length > 0 && (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              {todayDeals.map((deal) => (
                <DealCard {...deal} />
              ))}
            </div>
          )}
          {todayDeals.length == 0 && (
            <div className='text-foreground text-center'>
              <p>No deals for this day :(</p>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-8 text-foreground'>
          <h2 className='text-lg font-bold text-center'>Everday Deals</h2>
          {everydayDeals.length > 0 && (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              {everydayDeals?.map((deal) => (
                <DealCard {...deal} />
              ))}
            </div>
          )}
          {everydayDeals.length == 0 && (
            <div className='text-foreground text-center'>
              <p>No everyday deals :(</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
