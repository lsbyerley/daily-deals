import { create } from 'zustand';

interface LocationState {
  selectedCity: string;
  changeCity: (category: string) => void;
  selectedRegion: string;
  changeRegion: (region: string) => void;
  selectedCountry: string;
  changeCountry: (region: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedCity: 'all',
  changeCity: (city) => {
    return set(() => ({
      selectedCity: city,
    }));
  },
  selectedRegion: 'all',
  changeRegion: (region) => {
    return set(() => ({
      selectedRegion: region,
    }));
  },
  selectedCountry: 'us',
  changeCountry: (country) => {
    return set(() => ({
      selectedCountry: country,
    }));
  },
}));
