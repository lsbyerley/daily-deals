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
import { cn } from '@/lib/utils';

import { DealWithBusiness } from '@/types';

const DealCard = (props: DealWithBusiness) => {
  const { description, businesses, time_start, time_end } = props;

  return (
    <Card className='grid grid-rows-stickyfooter'>
      <CardHeader>
        <CardTitle className='text-lg text-center'>{businesses?.name}</CardTitle>
        <CardDescription className='text-center'></CardDescription>
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
            Starts {format(new Date(`2023-08-12T${time_start}`), 'h:mm aaa')}
          </p>
        )}
        {time_end && (
          <p>Ends {format(new Date(`2023-08-12T${time_end}`), 'h:mm aaa')}</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default DealCard;
