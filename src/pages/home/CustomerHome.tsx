import CustomerHeader from "../../components/CustomerHeader";
import CustomerLocation from "../../components/CustomerLocation";
import NearbyAvailableDrivers from "../../components/NearbyAvailableDrivers";
import SearchDestination from "../../components/SearchDestination";

const CustomerHome = () => {
  return (
    <div>
      <CustomerHeader />
      <CustomerLocation />
      <SearchDestination />
      <NearbyAvailableDrivers />
    </div>
  );
};

export default CustomerHome;
