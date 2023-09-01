'use client';

import { useRef, useEffect, useState } from "react"
import DealCard from '@/components/DealCard';
import { Frown } from 'lucide-react';
import { format } from 'date-fns-tz';

import { DealModuleProps } from '@/types';

export default function DealModule(props: DealModuleProps) {
  const { deals = [] } = props;
  const [today, setToday] = useState<string>();
  const test = format(new Date(), "yyyy-MM-dd h:m z");

  useEffect(() => {
    setToday(format(new Date(), 'EEEE'));
  }, [])

  if (!today) return null;

  const todayDeals = deals?.filter(
    (deal) => deal.type === 'daily' && deal.day?.includes(today)
  ) || [];
  const everydayDeals = deals?.filter((deal) => deal.type === 'everyday') || [];
  const happyHourDeals = deals?.filter((deal) => deal.type === 'happyhour') || [];

  return (
    <>
      <div className='flex flex-col gap-8 text-foreground'>
        <p className='hidden'>{test}</p>
        <p className='hidden'>{format(new Date(), "yyyy-MM-dd h:m O")}</p>
        <p className='hidden'>{format(new Date(), "ppp")}</p>
        <p className='hidden'>{format(new Date(), "pppp")}</p>
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
    </>
  );
}
