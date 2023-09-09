'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LocateFixed } from 'lucide-react';
import { DialogProps } from '@/types';

export default async function LocationDialog(props: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <LocateFixed className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
          <span className='sr-only'>Change location</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View another location?</DialogTitle>
          <DialogDescription>
            <span className='block'>This action is currently a work in progress. Check back soon!</span>
            <span className='block'>Current Geo: {JSON.stringify(props, null, ' ')}</span>
            <Link className='block' href='/city/johnson-city.tn.us'>Example City Link</Link>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
