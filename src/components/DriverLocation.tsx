import { useAppSelector } from "../store/store";
import { selectDriverAuth } from "../store/reducers/driverSlice";

type Location = {
  latitude: number | null;
  longitude: number | null;
};

function DriverLocation() {
  const { location } =
    useAppSelector(selectDriverAuth);

  return (
    <div className="w-full max-w-xs mx-auto my-20">
      <h2>My Current Location</h2>
      <p>{location}</p>
    </div>
  );
}

export default DriverLocation;
