'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import usePlacesSearch from '@/app/hooks/usePlacesSearch';
import SelectedPlace from '@/components/SelectedPlace';
import { Feature } from '@/types';

interface props {
  types?: string
  onPlaceSelect?: Function
  searchPlaceholder?: string
}

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'na'

export default function PlacesSearch({ types, onPlaceSelect, searchPlaceholder }: props) {
  const places = usePlacesSearch({ initialValue: '', token, types });

  return (
    <div className='w-full'>
      <p className='text-sm text-muted-foreground'>Search for a business to add and we'll try to prefill the info for you</p>
      <Input
        className='mt-4'
        placeholder={searchPlaceholder || 'Search for a place'}
        onChange={places.onChange}
        value={places.value}
      />
      <ul className='w-full mt-4'>
        {places.suggestions?.map((suggestion: Feature) => {
          return (
            <li key={suggestion.id}>
              <Button
                variant='outline'
                className='mb-2 w-full'
                onClick={() => {
                  if (onPlaceSelect) {
                    onPlaceSelect(suggestion);
                    places.setSuggestions([]);
                    return;
                  }
                  places.setValue(suggestion.place_name);
                  places.setSuggestions([]);
                  places.setSelected(suggestion);
                }}
              >
                {suggestion.place_name}
              </Button>
            </li>
          );
        })}
      </ul>
      <SelectedPlace place={places.selected} />
    </div>
  );
}
