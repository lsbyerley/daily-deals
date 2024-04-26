'use client';

import { useLayoutEffect } from 'react';
import { useLocationStore } from '@/providers/LocationStoreProvider';

const HydrateStore = () => {
  const [{}, locationStore] = useLocationStore((state) => state);

  useLayoutEffect(() => {
    if (!locationStore.persist?.hasHydrated()) {
      locationStore.persist.rehydrate();
    }
  }, []);

  return (<></>);
};

export default HydrateStore