import React from 'react'
import { useLazyGetNearbyDriversQuery } from '../services/api'

const NearbyAvailableDrivers = () => {
    const [getNearbyDrivers, {data, isSuccess}] = useLazyGetNearbyDriversQuery();

    

  return (
    <div>
        <button >Get Nearby Drivers</button>
    </div>
  )
}

export default NearbyAvailableDrivers