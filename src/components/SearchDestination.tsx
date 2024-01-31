import React from 'react'

const SearchDestination = () => {
  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 items-center mx-10'>
        <p>Search Destination</p>
        <input type="text" placeholder='Drop Location' className='w-full p-3 outline-none' />
        <button className='w-full p-3 bg-black mt-5 text-white rounded-lg'>Search</button>
    </div>
  )
}

export default SearchDestination