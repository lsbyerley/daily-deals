'use client';

import { useEffect, useState } from 'react';
import DealCard from '@/components/DealCard';
import { Frown } from 'lucide-react';
import { format } from 'date-fns-tz';

import { DealModuleProps } from '@/types';

// TODO: hydration error in this component in prod

export default function DealModule(props: DealModuleProps) {
  const { deals = [] } = props;
  // const today = format(new Date(), 'EEEE');
  const [today, setToday] = useState<string>();

  useEffect(() => {
    setToday(format(new Date(), 'EEEE'));
  }, []);

  if (!today) return null;

  const todayDeals =
    deals?.filter(
      (deal) => deal.type === 'daily' && deal.day?.includes(today)
    ) || [];
  const everydayDeals = deals?.filter((deal) => deal.type === 'everyday') || [];
  const happyHourDeals =
    deals?.filter((deal) => deal.type === 'happyhour') || [];

  return (
    <div className='flex flex-col gap-14 animate-in'>
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
              No {today} deals found <Frown className='ml-2' />
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
              No happy hour deals found <Frown className='ml-2' />
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
              No every day deals found <Frown className='ml-2' />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
