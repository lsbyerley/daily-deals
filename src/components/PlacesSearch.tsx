'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import usePlacesSearch from '@/app/hooks/usePlacesSearch';
import { Suggestion } from '@/types';

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
      <Input
        className='mt-4'
        placeholder={searchPlaceholder || 'Search for a place'}
        onChange={places.onChange}
        value={places.value}
      />
      <ul className='w-full mt-4'>
        {places.suggestions?.map((suggestion: Suggestion) => {
          return (
            <li key={suggestion.mapbox_id}>
              <Button
                variant='outline'
                className='mb-2 w-full'
                onClick={() => {
                  if (onPlaceSelect) {
                    onPlaceSelect(suggestion);
                  }
                  places.setValue(suggestion.name);
                  places.setSuggestions([]);
                  places.setSelected(suggestion);
                }}
              >
                {suggestion.name} ({suggestion.place_formatted})
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
