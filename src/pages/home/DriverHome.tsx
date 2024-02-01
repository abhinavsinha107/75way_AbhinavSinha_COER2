import DriverHeader from "../../components/DriverHeader";
import { useAppSelector } from "../../store/store";
import { selectDriverAuth } from "../../store/reducers/driverSlice";
import DriverLocation from "../../components/DriverLocation";
import ManageRequests from "../../components/ManageRequests";

const DriverHome = () => {
  const { status } = useAppSelector(selectDriverAuth);

  return (
    <div>
      <DriverHeader />
      {status && <DriverLocation />}
      <ManageRequests />
    </div>
  );
};

export default DriverHome;
