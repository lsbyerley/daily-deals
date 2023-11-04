'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LocateFixed } from 'lucide-react';
import { DialogProps, Feature } from '@/types';
import PlacesSearch from './PlacesSearch';
import { normalizeGeoFromMB } from '@/lib/utils';

export default function LocationDialog(props: DialogProps) {
  const router = useRouter()

  const handleSelectPlace = (props: Feature) => {
    const geo = normalizeGeoFromMB(props);
    router.push(`/city/${geo.city}, ${geo.region}, ${geo.country}`);
  };

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
          <DialogDescription asChild>
            <div className='relative'>
              <span className='block'>
                This action is currently a work in progress. Check back soon!
              </span>
              <span className='block mt-4 break-words'>
                Current Geo: {JSON.stringify(props, null, ' ')}
              </span>
              <Link className='block my-4' href='/city/johnson-city.tn.us'>
                Example City Link
              </Link>
              <PlacesSearch types='place' onPlaceSelect={handleSelectPlace} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
