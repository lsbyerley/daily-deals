'use client'

import { useState } from "react";
import PlacesSearch from "./PlacesSearch";
import CreateBusinessForm from "./CreateBusinessForm";
import { Feature } from '@/types';

interface props {
  createBusiness: Function
}

const CreateBusinessClient = ({ createBusiness }: props) => {
  const [place, setPlace] = useState<Feature>();

  const handleSelectPlace = (place: Feature) => {
    setPlace(place);
  };

  return (
    <>
      <PlacesSearch searchPlaceholder='Search for a business' onPlaceSelect={handleSelectPlace} />
      {place && <CreateBusinessForm place={place} handleSubmitCreate={createBusiness} />}
    </>
  )
};

export default CreateBusinessClient;