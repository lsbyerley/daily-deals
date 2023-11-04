import { Feature } from "@/types";

interface SelectedPlaceProps {
  place: Feature | undefined;
}

const SelectedPlace = (props: SelectedPlaceProps) => {
  const { place } = props;

  return (
    <div>
      {JSON.stringify(place, null, '')}
      <form></form>
    </div>
  )
};

export default SelectedPlace;