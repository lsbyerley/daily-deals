'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type LocationStore, createLocationStore } from '@/stores/LocationStore'

type LocationBoundStore = ReturnType<typeof createLocationStore>;

export const LocationStoreContext = createContext<LocationBoundStore | null>(
  null,
);

export interface LocationStoreProviderProps {
  children: ReactNode
}

export const LocationStoreProvider = ({
  children,
}: LocationStoreProviderProps) => {
  const storeRef = useRef<LocationBoundStore>();

  if (!storeRef.current) {
    storeRef.current = createLocationStore()
  }

  return (
    <LocationStoreContext.Provider value={storeRef.current}>
      {children}
    </LocationStoreContext.Provider>
  )
}

export const useLocationStore = <T,>(
  selector: (store: LocationStore) => T,
): [T, LocationBoundStore] => {
  const locationStore = useContext(LocationStoreContext)

  if (!locationStore) {
    throw new Error(`useLocationStore must be use within LocationStoreProvider`)
  }

  return [useStore(locationStore, selector), locationStore]
}