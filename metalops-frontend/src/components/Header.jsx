import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between bg-gray-900 text-slate-300 p-4'>
      {/* Left */}
      <div className='flex gap-4'>
        <div><a href='/'><img src='/logo.png' className='w-28'></img></a></div>
      </div>

      {/* Right */}
      <div className='flex gap-4 items-center'>
        <div className='font-[Gudea]'><a href='/'>Home</a></div>
        <div className='font-[Gudea]'><a href='/customers'>Customers</a></div>
        <div className='font-[Gudea]'><a href='/orders'>Orders</a></div>
      </div>
    </div>
  )
}
