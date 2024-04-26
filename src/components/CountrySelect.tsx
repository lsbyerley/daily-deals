'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLocationStore } from '@/providers/LocationStoreProvider';

const countries = [
  {
    value: 'us',
    label: 'US',
  },
  {
    value: 'ca',
    label: 'Canada',
  },
];

const CountrySelect = () => {
  const [{ selectedCountry, changeCountry }, locationStore] = useLocationStore((state) => state);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value !== selectedCountry) {
      setValue(selectedCountry);
    }
  }, [selectedCountry]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-18 ml-2 justify-between'
          size='sm'
        >
          {value
            ? countries.find((country) => country.value === value)?.label
            : 'Select country...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search country...' />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    changeCountry(country.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === country.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {country.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelect;
