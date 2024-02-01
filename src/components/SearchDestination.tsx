import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  selectCustomerAuth,
  setCustomer,
} from "../store/reducers/customerSlice";
import { useUpdateCustomerLocMutation } from "../services/api";

type Location = {
  latitude: number | null;
  longitude: number | null;
};

const SearchDestination = () => {
  const dispatch = useAppDispatch();
  const { name, customerAuthToken, customerRefreshToken } =
    useAppSelector(selectCustomerAuth);
  const [position, setPosition] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [showDestination, setShowDestination] = useState<boolean>(false);

  const [updateCustomerLoc, { data, isSuccess, isError, error }] =
    useUpdateCustomerLocMutation();

  const fetchCity = async (latitude: any, longitude: any) => {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    let data = await response.json();
    setSource(data.address.town);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        if (position.coords.latitude !== null) {
          await fetchCity(position.coords.latitude, position.coords.longitude);
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const setDestinationAndUpdateUserLocation = async () => {
    await updateCustomerLoc({
      location: source,
      customerAuthToken: customerAuthToken || "",
      customerRefreshToken: customerRefreshToken || "",
    });
    dispatch(
      setCustomer({
        name: name || "",
        location: source || "",
        customerAuthToken: customerAuthToken || "",
        customerRefreshToken: customerRefreshToken || "",
      })
    );
    setShowDestination(true);
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 items-center mx-10">
      {!showDestination ? (
        <div>
          <p>Set Destination</p>
          <input
            type="text"
            placeholder="Drop Location"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 outline-none"
          />
          <button
            onClick={setDestinationAndUpdateUserLocation}
            className="w-full p-3 bg-black mt-5 text-white rounded-lg"
          >
            Set Destination
          </button>
        </div>
      ) : (
        <div>
          <p>
            Your Destination is <strong>{destination}</strong>
          </p>
          <button
            className="p-3 bg-black mt-5 text-white rounded-lg"
            onClick={() => setShowDestination(!showDestination)}
          >
            Change Destination
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchDestination;
