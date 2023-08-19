import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

const DealComponent = (props: any) => {
  'use client'

  const { description, businesses, time_start, time_end } = props;
  return (
    <div className='flex flex-col justify-start items-center'>
      <p>{businesses?.name}</p>
      <div className='prose prose-sm'>
        <ReactMarkdown children={description} rehypePlugins={[remarkGfm]} />
      </div>
      {time_start && (
        <p>Starts @ {format(new Date(`2023-08-12T${time_start}`), 'h:mm aaa')}</p>
      )}
      {time_end && (
        <p>Ends @ {format(new Date(`2023-08-12T${time_end}`), 'h:mm aaa')}</p>
      )}
    </div>
  );
};

export default async function Deals({ searchParams }: DealsPageProps) {
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

  const todayDeals = deals?.filter(
    (deal) => deal.type === 'daily' && deal.day === today
  );
  const everydayDeals = deals?.filter((deal) => deal.type === 'everyday');

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground'>
        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />

        <div className='flex flex-col gap-8 text-foreground'>
          <h2 className='text-lg font-bold text-center'>
            Deals on {today} in {city}, {region}
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            {todayDeals?.map((deal) => (
              <DealComponent {...deal} />
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-8 text-foreground'>
          <h2 className='text-lg font-bold text-center'>
            Deals everyday in {city}, {region}
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            {everydayDeals?.map((deal) => (
              <DealComponent {...deal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
