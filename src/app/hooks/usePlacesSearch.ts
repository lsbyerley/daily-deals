'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts'
import { Feature } from '@/types';

// https://docs.mapbox.com/api/search/geocoding/

interface SearchProps {
  initialValue: string
  token: string
  types?: string
}

const usePlacesSearch = (props: SearchProps) => {
  const { initialValue, token, types = 'poi' } = props;
  const [value, setValue] = useState(initialValue);
  const [selected, setSelected] = useState<Feature>();
  const [suggestions, setSuggestions] = useState<Feature[]>([]);
  const debouncedValue = useDebounce(value, 600);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event?.target?.value);
  };

  const performFetch = async () => {
    // TODO: move fetch to api route
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${debouncedValue}.json?access_token=${token}&autocomplete=true&types=${types}&country=US`;
      const response = await fetch(endpoint);
      const results = await response.json();
      // console.log('results', results);
      setSuggestions(results?.features);
    } catch (error) {
      console.log('Error fetching data, ', error);
    }
  };

  useEffect(() => {
    if (!selected && debouncedValue) {
      performFetch();
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue]);

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions,
    selected,
    setSelected,
  };
};

export default usePlacesSearch;
