import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import RegisterDriver from "./pages/auth/RegisterDriver";
import LoginDriver from "./pages/auth/LoginDriver";
import RegisterCustomer from "./pages/auth/RegisterCustomer";
import LoginCustomer from "./pages/auth/LoginCustomer";
import CustomerHome from "./pages/home/CustomerHome";
import DriverHome from "./pages/home/DriverHome";
import { useAppDispatch } from "./store/store";
import { setCustomer } from "./store/reducers/customerSlice";
import { setDriver } from "./store/reducers/driverSlice";
import { useEffect } from "react";


function App() {
  const dispatch = useAppDispatch();
  const customer = JSON.parse(localStorage.getItem("customer") || "{}");
  const driver = JSON.parse(localStorage.getItem("driver") || "{}");

  useEffect(() => {
    dispatch(setCustomer(customer));
    dispatch(setDriver(driver));
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerHome" element={<CustomerHome />} />
        <Route path="/driverHome" element={<DriverHome />} />
        <Route path="/registerDriver" element={<RegisterDriver />} />
        <Route path="/loginDriver" element={<LoginDriver />} />
        <Route path="/registerCustomer" element={<RegisterCustomer />} />
        <Route path="/loginCustomer" element={<LoginCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
