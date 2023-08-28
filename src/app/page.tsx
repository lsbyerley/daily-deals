import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import DealCard from '@/components/DealCard';
import LocationDialog from '@/components/LocationDialog';
import { Frown } from 'lucide-react';
// import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns'

import type { Database } from '@/db_types';
import { IndexPageProps } from '@/types';

export const dynamic = 'force-dynamic';

export default async function Index({ searchParams }: IndexPageProps) {
  const today = format(new Date(), 'EEEE')
  const city = searchParams.city;
  const region = searchParams.region;
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: deals } = await supabase
    .from('deals')
    .select('*, businesses!inner(*)')
    .eq('businesses.region', region)
    .eq('businesses.city', city);

  const todayDeals =
    deals?.filter(
      (deal) => deal.type === 'daily' && deal.day?.includes(today)
    ) || [];
  const everydayDeals = deals?.filter((deal) => deal.type === 'everyday') || [];
  const happyHourDeals =
    deals?.filter((deal) => deal.type === 'happyhour') || [];

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

        <div className='flex flex-col gap-8 text-foreground'>
          <h2 className='text-2xl font-bold text-center'>{today} Deals</h2>
          {todayDeals.length > 0 && (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              {todayDeals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>
          )}
          {todayDeals.length == 0 && (
            <div className='text-foreground text-center'>
              <p className='inline-flex items-center justify-center'>
                No {today} only deals <Frown className='ml-2' />
              </p>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-8 text-foreground'>
          <h2 className='text-2xl font-bold text-center'>Happy Hour Deals</h2>
          {happyHourDeals.length > 0 && (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              {happyHourDeals?.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>
          )}
          {happyHourDeals.length == 0 && (
            <div className='text-foreground text-center'>
              <p className='inline-flex items-center justify-center'>
                No happy hour deals <Frown className='ml-2' />
              </p>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-8 text-foreground'>
          <h2 className='text-2xl font-bold text-center'>Every Day Deals</h2>
          {everydayDeals.length > 0 && (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              {everydayDeals?.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>
          )}
          {everydayDeals.length == 0 && (
            <div className='text-foreground text-center'>
              <p className='inline-flex items-center justify-center'>
                No every day deals found in your city <Frown className='ml-2' />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
