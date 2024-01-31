import CustomerHeader from '../../components/CustomerHeader'
import MyLocation from '../../components/MyLocation'
import NearbyAvailableDrivers from '../../components/NearbyAvailableDrivers'
import SearchDestination from '../../components/SearchDestination'

const CustomerHome = () => {
  return (
    <div>
      <CustomerHeader />
      <MyLocation />
      <SearchDestination />
      <NearbyAvailableDrivers />
    </div>
  )
}

export default CustomerHome