import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterCustomerMutation } from "../../services/api";

export default function RegisterCustomer() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const [registerCustomer, { data, isSuccess, isError, error }] =
    useRegisterCustomerMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      password: password,
    };
    if (formData) {
      await registerCustomer(formData);
    } else {
      console.log("Error occured while registering");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Customer registered successfully...");
      navigate("/loginCustomer");
    }
  }, [isSuccess]);

  return (
    <div className="w-full max-w-xs mx-auto my-5">
      <h2 className="text-center">Register as Customer</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center">
        <span>Already have an account? </span>
        <Link to="/loginCustomer">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
