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

const DealCard = (props: any) => {
  const { description, type, businesses, time_start, time_end } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{businesses?.name}</CardTitle>
        <CardDescription>{type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='prose prose-sm'>
          <ReactMarkdown children={description} rehypePlugins={[remarkGfm]} />
        </div>
      </CardContent>
      <CardFooter>
        {time_start && (
          <p>
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
