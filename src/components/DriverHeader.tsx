import { useAppDispatch, useAppSelector } from "../store/store";
import {
  setDriver,
  removeDriver,
  selectDriverAuth,
} from "../store/reducers/driverSlice";
import { useNavigate } from "react-router-dom";
import { useLazyLogoutDriverQuery, useUpdateDriverLocMutation } from "../services/api";
import { FormEvent, useEffect, useState } from "react";

type Location = {
  latitude: number | null;
  longitude: number | null;
};

function DriverHeader() {
  const { name, location, driverAuthToken, driverRefreshToken, status } =
    useAppSelector(selectDriverAuth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logoutDriver] =
    useLazyLogoutDriverQuery();

  const [updateDriverLoc, { data, isSuccess, isError, error }] =
    useUpdateDriverLocMutation();

  const handleUpdateStatus = async (e: FormEvent) => {
    e.preventDefault();
    if(!status) {
      dispatch(
        setDriver({
          name: name || "",
          location: town,
          driverAuthToken: driverAuthToken || "",
          driverRefreshToken: driverRefreshToken || "",
          status: !status,
        })
      );
      await updateDriverLoc({
        location: town,
        driverAuthToken: driverAuthToken || "",
        driverRefreshToken: driverRefreshToken || "",
      });
    } else {
      dispatch(
        setDriver({
          name: name || "",
          location: "",
          driverAuthToken: driverAuthToken || "",
          driverRefreshToken: driverRefreshToken || "",
          status: !status,
        })
      );
      await updateDriverLoc({
        location: "",
        driverAuthToken: driverAuthToken || "",
        driverRefreshToken: driverRefreshToken || "",
      });
    }
  };

  const handleLogout = async () => {
    await logoutDriver();
    dispatch(removeDriver());
    navigate("/loginDriver");
  };

  const [position, setPosition] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [town, setTown] = useState<string>("");
  const [townIsSet, setTownIsSet] = useState<boolean>(false)

  const fetchCity = async (latitude: any, longitude: any) => {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    let data = await response.json();
    setTown(data.address.town);
    setTownIsSet(true);
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

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">My Ride App</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">Hello {name}</a>
          <a
            onClick={handleUpdateStatus}
            className="mr-5 hover:text-gray-900 cursor-pointer"
          >
            Change Status:{" "}
            <span className="text-lg text-green-600">
              {status ? "Active" : "Inactive"}
            </span>
          </a>
        </nav>
        <button
          onClick={handleLogout}
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          Logout
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
export default DriverHeader;
