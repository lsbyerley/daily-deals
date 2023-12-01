'use client'

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import PlacesSearch from "./PlacesSearch";
import CreateBusinessForm from "./CreateBusinessForm";
import { Feature } from '@/types';

interface props {
  createBusiness: Function
}

const CreateBusinessClient = ({ createBusiness }: props) => {
  const [place, setPlace] = useState<Feature>();
  const router = useRouter();

  const handleSelectPlace = (place: Feature) => {
    setPlace(place);
  };

  // TODO: createData type interface
  const createBusinessClient = async (createData: any) => {
    const { street, city, zipcode } = createData;
    const supabase = createClient();

    // check if business already exists
    const { data } = await supabase.from('businesses').select()
    .eq('street', street)
    .eq('city', city) 
    .eq('zipcode', zipcode)
    .single();

    if (data) {
      console.error('LOG: business exists', data);
      window.alert('Business already exists!');
      return;
    }

    // perform the insert
    const { error } = await supabase.from('businesses').insert(createData);

    if (error) {
      console.error('LOG: business create failed', error);
      window.alert('Business creation failed :( Check console');
      return;
    }

    window.alert('Business created!');

    router.push('/');
  };

  return (
    <>
      <PlacesSearch searchPlaceholder='Search for a business' onPlaceSelect={handleSelectPlace} />
      {place && <CreateBusinessForm place={place} setPlace={setPlace} handleSubmitCreate={createBusiness} />}
    </>
  )
};

export default CreateBusinessClient;