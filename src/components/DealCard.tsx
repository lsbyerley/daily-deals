'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Wine, Utensils } from 'lucide-react';
import { cn, isActiveDealTime } from '@/lib/utils';

import { DealWithBusiness } from '@/types';

const DealCard = (deal: DealWithBusiness) => {
  const { description, businesses, time_start, time_end, category } = deal;
  // TODO: spacing in flex card header is applied to absolute positioned icon (food)

  const isActiveDeal = isActiveDealTime(deal);
  const todayString = format(new Date(), 'yyyy-MM-dd');

  return (
    <Card className='grid grid-rows-stickyfooter relative'>
      <span className='hidden'>istimeactive {`${isActiveDeal}`}</span>
      <CardHeader>
        {category?.includes('drink') && <Wine size={20} className='absolute top-0 left-1 mt-1' />}
        <CardTitle className='text-lg text-center'>{businesses?.name}</CardTitle>
        <CardDescription className='text-center'></CardDescription>
        {category?.includes('food') && <Utensils size={20} className='absolute top-0 right-2' />}
      </CardHeader>
      <CardContent>
        <div className='prose text-foreground'>
          <ReactMarkdown children={description} rehypePlugins={[remarkGfm]} />
        </div>
      </CardContent>
      <CardFooter className={cn(
        'text-sm text-muted-foreground',
        time_start && time_end ? 'justify-between' : 'justify-center'
      )}>
        {time_start && (
          <p>
            Starts {format(new Date(`${todayString}T${time_start}`), 'h:mm aaa')}
          </p>
        )}
        {time_end && (
          <p>Ends {format(new Date(`${todayString}T${time_end}`), 'h:mm aaa')}</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default DealCard;
