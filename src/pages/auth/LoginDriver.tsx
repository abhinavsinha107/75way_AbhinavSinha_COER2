import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginDriverMutation } from "../../services/api";
import { useAppDispatch } from "../../store/store";
import { setDriver } from "../../store/reducers/driverSlice";

export default function LoginDriver() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginDriver, { data, isSuccess, isError, error }] =
    useLoginDriverMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    if (formData) {
      await loginDriver(formData);
    } else {
      console.log("Error occured while logging in");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("User logged in successfully...");
      dispatch(
        setDriver({
          name: data.driver.name,
          location: "",
          driverAuthToken: data.driverAuthToken,
          driverRefreshToken: data.driverRefreshToken,
          status: false,
        })
      );
      navigate("/driverHome");
    }
  }, [isSuccess]);

  return (
    <div className="w-full max-w-xs mx-auto my-5">
      <h2 className="text-center">Login as Driver</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">
            Please enter your password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="text-center">
        <span>Don&apos;t have an account? </span>
        <Link to="/registerDriver">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
