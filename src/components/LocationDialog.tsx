import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LocateFixed } from 'lucide-react';

export default async function LocationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <LocateFixed className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <span className='sr-only'>Change location</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change your location?</DialogTitle>
          <DialogDescription>
            This action is currently a work in progress. Check back soon!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
