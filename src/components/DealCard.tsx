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

import { DealCardProps } from '@/types';

const DealCard = (props: DealCardProps) => {
  const { description, type, businesses, time_start, time_end } = props;
  const dealType = type === 'happyhour' ? 'Happy Hour' : '';
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg text-center'>{businesses?.name}</CardTitle>
        <CardDescription>{dealType}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='prose'>
          <ReactMarkdown children={description} rehypePlugins={[remarkGfm]} />
        </div>
      </CardContent>
      <CardFooter className='justify-center'>
        {time_start && (
          <p className='text-foreground'>
            Starts @ {format(new Date(`2023-08-12T${time_start}`), 'h:mm aaa')}
          </p>
        )}
        {time_end && (
          <p>Ends @ {format(new Date(`2023-08-12T${time_end}`), 'h:mm aaa')}</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default DealCard;
