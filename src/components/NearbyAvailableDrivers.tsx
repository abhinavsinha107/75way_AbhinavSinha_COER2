import { useState } from "react";
import {
  useGetNearbyDriversMutation,
  useRequestRideMutation,
} from "../services/api";
import { selectCustomerAuth } from "../store/reducers/customerSlice";
import { useAppSelector } from "../store/store";

const NearbyAvailableDrivers = () => {
  const [showDriversButton, setShowDriversButton] = useState<boolean>(true);
  const [waiting, setWaiting] = useState<boolean>(false);

  const { location, customerAuthToken, customerRefreshToken } =
    useAppSelector(selectCustomerAuth);
  const [getNearbyDrivers, { data, isSuccess }] = useGetNearbyDriversMutation();
  const [requestRide] = useRequestRideMutation();

  const getDrivers = async () => {
    await getNearbyDrivers({ location: location || "" });
    setShowDriversButton(false);
  };

  const requestARide = async (driverId: string) => {
    await requestRide({
      driverId,
      customerAuthToken: customerAuthToken || "",
      customerRefreshToken: customerRefreshToken || "",
      location: location || "",
    });
    setWaiting(true);
  };

  if (waiting) {
    return (
      <div className="mt-3 text-center mb-5">
        <p>Waiting for captain to accept</p>
      </div>
    );
  }

  return (
    <div className="mt-3 text-center mb-5">
      {showDriversButton && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={getDrivers}
        >
          Get Nearby Drivers
        </button>
      )}

      {isSuccess &&
        data.map((driver: any, i: number) => {
          return (
            <div key={i}>
              <p>
                {driver.name} - {driver.vehicleType} Wheeler
                <button
                  onClick={() => requestARide(driver._id)}
                  className="p-3 bg-black mt-5 text-white rounded-lg"
                >
                  Request Ride
                </button>
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default NearbyAvailableDrivers;
