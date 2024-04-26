import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware'

export type LocationState = {
  selectedCity: string;
  selectedRegion: string;
  selectedCountry: string;
};

export type LocationActions = {
  changeCity: (newCity: string) => void;
  changeRegion: (newRegion: string) => void;
  changeCountry: (newCountry: string) => void;
};

export const defaultInitState: LocationState = {
  selectedCity: '',
  selectedRegion: '',
  selectedCountry: 'us',
};

export type LocationStore = LocationState & LocationActions;

export const initLocationStore = (): LocationState => {
  return {
    ...defaultInitState,
  };
};

export const createLocationStore = (
  initState: LocationState = defaultInitState
) => {
  return createStore<LocationStore>()(
    persist(
      (set) => ({
        ...initState,
        changeCity: (newCity) => {
          return set(() => ({
            selectedCity: newCity,
          }));
        },
        changeRegion: (newRegion) => {
          return set(() => ({
            selectedRegion: newRegion,
          }));
        },
        changeCountry: (newCountry) => {
          return set(() => ({
            selectedCountry: newCountry,
          }));
        },
      }),
      {
        name: 'dailydeals.location-store',
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
      }
    )
  );
  /* return create<LocationStore>()((set) => ({
    ...initState,
    changeCity: (newCity) => {
      return set(() => ({
        selectedCity: newCity,
      }));
    },
    changeRegion: (newRegion) => {
      return set(() => ({
        selectedRegion: newRegion,
      }));
    },
    changeCountry: (newCountry) => {
      return set(() => ({
        selectedCountry: newCountry,
      }));
    },
  })); */
};
