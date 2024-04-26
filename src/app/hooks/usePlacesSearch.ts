'use client';

import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useDebounceValue } from 'usehooks-ts'
import { Suggestion } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// https://docs.mapbox.com/api/search/geocoding/

interface SearchProps {
  initialValue: string
  token: string
  types?: string
  country: string
}

const usePlacesSearch = (props: SearchProps) => {
  const { initialValue, token, types = 'poi', country } = props;
  const [value, setValue] = useState(initialValue);
  const [selected, setSelected] = useState<Suggestion>();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [debouncedValue] = useDebounceValue(value, 600);
  const session_token = useRef(uuidv4());

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '') {
      setSelected(undefined);
      setSuggestions([])
    };
    setValue(value);
  };

  const performFetch = async () => {
    // TODO: move fetch to api route
    try {
      //const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${debouncedValue}.json?access_token=${token}&autocomplete=true&types=${types}&country=US`;
      const endpoint = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${debouncedValue}&access_token=${token}&session_token=${session_token.current}&types=${types}&country=${country}&language=en&limit=10`
      const response = await fetch(endpoint);
      const results = await response.json();
      setSuggestions(results?.suggestions);
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
