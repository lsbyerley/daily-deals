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
import { Button } from '@/components/ui/button';
import { LocateFixed } from 'lucide-react';
import { DialogProps, Suggestion } from '@/types';
import PlacesSearch from './PlacesSearch';
import { normalizeGeoFromMB } from '@/lib/utils';

export default function LocationDialog(props: DialogProps) {
  const router = useRouter()

  const handleSelectPlace = (props: Suggestion) => {
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
              <PlacesSearch types='place' onPlaceSelect={handleSelectPlace} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
