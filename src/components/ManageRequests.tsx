import React, { useEffect, useState } from "react";
import {
  useApproveRequestMutation,
  useCancelRequestMutation,
  useFinishRideMutation,
  useGetCabRequestsMutation,
  useStartRideMutation,
} from "../services/api";
import { useAppSelector } from "../store/store";
import { selectDriverAuth } from "../store/reducers/driverSlice";

const ManageRequests = () => {
  const [customerIdd, setCustomerIdd] = useState<string>("");
  const [locationn, setLocationn] = useState<string>("");

  const [approve, setApprove] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);

  const { driverAuthToken, driverRefreshToken } =
    useAppSelector(selectDriverAuth);

  const [getCabRequests, { data, isSuccess }] = useGetCabRequestsMutation();
  const [approveRequestOfCab] = useApproveRequestMutation();
  const [cancelRequestOfCab] = useCancelRequestMutation();
  const [startRideOfCab] = useStartRideMutation();
  const [finishRideOfCab] = useFinishRideMutation();

  const getRequests = async () => {
    await getCabRequests({
      driverAuthToken: driverAuthToken || "",
      driverRefreshToken: driverRefreshToken || "",
    });
  };

  const approveRequest = async (customerId: string, location: string) => {
    await approveRequestOfCab({
      customerId,
      driverAuthToken: driverAuthToken || "",
      driverRefreshToken: driverRefreshToken || "",
      location: location || "",
    });
    setApprove(true);
    setCustomerIdd(customerId);
    setLocationn(location);
  };

  const cancelRequest = async (customerId: string, location: string) => {
    await cancelRequestOfCab({
      customerId,
      driverAuthToken: driverAuthToken || "",
      driverRefreshToken: driverRefreshToken || "",
      location: location || "",
    });
    setCancel(true);
  };

  const startRide = async () => {
    await startRideOfCab({
      customerId: customerIdd,
      driverAuthToken: driverAuthToken || "",
      driverRefreshToken: driverRefreshToken || "",
      location: locationn || "",
    });
    setApprove(false);
    setStart(true);
  };

  const finishRide = async () => {
    await finishRideOfCab({
      customerId: customerIdd,
      driverAuthToken: driverAuthToken || "",
      driverRefreshToken: driverRefreshToken || "",
      location: locationn || "",
    });
    setStart(false);
    setFinish(true);
  };

  if (approve) {
    return (
      <>
        <div className="mt-3 text-center mb-5">
          <button
            onClick={startRide}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Start Ride
          </button>
        </div>
      </>
    );
  }

  if (cancel) {
    return (
      <>
        <div className="mt-3 text-center mb-5">
          <p>You cancelled the ride...</p>
        </div>
      </>
    );
  }

  if (start) {
    return (
      <>
        <div className="mt-3 text-center mb-5">
          <button
            onClick={finishRide}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Finish
          </button>
        </div>
      </>
    );
  }

  if (finish) {
    return (
      <>
        <div className="mt-3 text-center mb-5">
          <p>Ride finished...</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Look for another customer
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="mt-3 text-center mb-5">
      <button
        onClick={getRequests}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Get All Requests
      </button>
      {isSuccess &&
        data.map((req: any, i: number) => {
          return (
            <div key={i}>
              <p>
                {req.customerId} - {req.location}
                <button
                  onClick={() => approveRequest(req.customerId, req.location)}
                  className="p-3 bg-black mt-5 text-white rounded-lg"
                >
                  Approve
                </button>
                <button
                  onClick={() => cancelRequest(req.customerId, req.location)}
                  className="p-3 bg-black mt-5 text-white rounded-lg"
                >
                  Cancel
                </button>
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default ManageRequests;
