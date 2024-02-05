import { useEffect, useState } from "react";
import {
  useGetCustomerStatusMutation,
  useGetNearbyDriversMutation,
  useGetRideHistoryMutation,
  useRequestRideMutation,
  useUpdateCustomerStatusMutation,
} from "../services/api";
import { selectCustomerAuth } from "../store/reducers/customerSlice";
import { useAppSelector } from "../store/store";

const NearbyAvailableDrivers = () => {
  const [showDriversButton, setShowDriversButton] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("");

  const { location, customerAuthToken, customerRefreshToken } =
    useAppSelector(selectCustomerAuth);
  const [getNearbyDrivers, { data, isSuccess }] = useGetNearbyDriversMutation();
  const [requestRide] = useRequestRideMutation();
  const [updateCustomerStatus] = useUpdateCustomerStatusMutation();
  const [getCustomerStatus, {data: customerStatusData, isSuccess: customerStatusSuccess}] = useGetCustomerStatusMutation();
  const [getRidesHistory, {data: customerRidesData, isSuccess: customerRidesSuccess}] = useGetRideHistoryMutation();

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
    await updateCustomerStatus({
      customerAuthToken: customerAuthToken || "",
      customerRefreshToken: customerRefreshToken || "",
      currentStatus: "Waiting"
    });
    setStatus("Waiting");
  };

  const checkRideHistory = async () => {
    await getRidesHistory({
      customerAuthToken: customerAuthToken || "",
      customerRefreshToken: customerRefreshToken || "",
    });
    setStatus("Checking Ride History");
  }

  const checkRideStatus = async () => {
    await getCustomerStatus({customerAuthToken: customerAuthToken || "", customerRefreshToken: customerRefreshToken || ""});
  }

  useEffect(() => {
    if (customerStatusSuccess) {
      setStatus(customerStatusData);
    }
  }, [customerStatusSuccess])

  if (status === "Waiting") {
    return (
      <>
        <div className="mt-3 text-center mb-5">
          <p>Waiting for driver to accept</p>
        </div>
        <div className="mt-3 text-center mb-5">
          <button onClick={checkRideStatus} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Get Updated Ride Information
          </button>
        </div>
      </>
    );
  }

  if (status === "Approved") {
    return (
      <>
        <div className="mt-3 text-center mb-5">
          <p>Driver is reaching at your location in few minutes</p>
        </div>
        <div className="mt-3 text-center mb-5">
          <button onClick={checkRideStatus} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Get Updated Ride Information
          </button>
        </div>
      </>
    );
  }

  if (status === "Rejected") {
    return (
      <>
        <div className="mt-3 text-center mb-5">
          <p>Sorry!!! Driver has rejected your request.</p>
        </div>
        <div className="mt-3 text-center mb-5">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Look for another Ride
          </button>
        </div>
      </>
    );
  }

  if (status === "Started") {
    return (
      <>
        <div className="mt-3 text-center mb-5">
          <p>Ride Started!! Enjoy your ride.</p>
        </div>
        <div className="mt-3 text-center mb-5">
          <button
            onClick={checkRideStatus}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Get Current Status
          </button>
        </div>
      </>
    );
  }

  if (status === "Finished") {
    return (
      <>
        <div className="mt-3 text-center mb-5">
          <p>Ride Finished!! Enjoyed your ride?</p>
        </div>
        <div className="mt-3 text-center mb-5">
            <button
              onClick={checkRideHistory}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Check your ride history
            </button>
        </div>
      </>
    );
  }

  if (status === "Checking Ride History") {
    return (
      <>
        <div className="mt-3 text-center mb-5">
          <p>Your completed rides are:-</p>
        </div>
        <div className="mt-3 text-center mb-5">
          {customerRidesSuccess &&
            customerRidesData.map((customer: any, i: number) => {
              return (
                <div key={i}>
                  <p>
                    {customer.driverId} - {customer.location} to ...
                  </p>
                </div>
              );
            })}
        </div>
      </>
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
