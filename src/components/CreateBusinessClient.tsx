'use client'

import { useState } from "react";
import PlacesSearch from "./PlacesSearch";
import CreateBusinessForm from "./CreateBusinessForm";
import { Suggestion } from '@/types';

interface props {
  createBusiness: Function
}

const CreateBusinessClient = ({ createBusiness }: props) => {
  const [place, setPlace] = useState<Suggestion>();

  const handleSelectPlace = (place: Suggestion) => {
    setPlace(place);
  };

  return (
    <>
      <PlacesSearch searchPlaceholder='Search for a business' onPlaceSelect={handleSelectPlace} />
      {place && <CreateBusinessForm place={place} setPlace={setPlace} handleSubmitCreate={createBusiness} />}
    </>
  )
};

export default CreateBusinessClient;