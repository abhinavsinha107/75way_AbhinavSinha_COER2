import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="m-4">Welcome to My Ride App</h1>
      <div className="flex justify-center gap-5">
        <div>
          <Link to="/loginDriver">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login as Driver
            </button>
          </Link>
        </div>
        <div>
          <Link to="/loginCustomer">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login as Customer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home