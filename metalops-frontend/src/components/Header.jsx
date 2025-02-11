import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between bg-gray-900 text-slate-300 p-4'>
      {/* Left */}
      <div className='flex gap-4'>
        <div><a href='/'>MetalOps</a></div>
      </div>

      {/* Right */}
      <div className='flex gap-4'>
        <div className=''><a href='/'>Dashboard</a></div>
        <div><a href='/customers'>Customers</a></div>
        <div><a href='/orders'>Orders</a></div>
      </div>
    </div>
  )
}
