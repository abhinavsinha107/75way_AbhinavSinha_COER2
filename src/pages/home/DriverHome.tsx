import React from 'react'
import DriverHeader from '../../components/DriverHeader'
import { useAppSelector } from '../../store/store';
import { selectDriverAuth } from '../../store/reducers/driverSlice';
import MyLocation from '../../components/MyLocation';

const DriverHome = () => {
  const { status } = useAppSelector(selectDriverAuth);

  return (
    <div>
      <DriverHeader />
      {status && <MyLocation />}
    </div>
  )
}

export default DriverHome