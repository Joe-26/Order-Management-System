import React, { useEffect, useState } from 'react'
import { getDashboardData } from '../service/OrderService'
import { getCustomerCount } from '../service/CustomerService';

export default function Dashboard() {
  const [totalRevenue, setTotalRevenue] = useState();
  const[ordersPending, setOrdersPending] = useState();
  const[ordersDelivered, setOrdersDelivered] = useState();
  const[amountReceivable, setAmountReceivable] = useState();
  const [totalCustomers, setTotalCustomers] = useState();

  useEffect(() => {
    getDash();
  }, [])


  function getDash() {
    getDashboardData().then((response) => {
      console.log(response.data);
      setTotalRevenue(response.data[0]);
      setAmountReceivable(response.data[1]);
      setOrdersDelivered(response.data[2]);
      setOrdersPending(response.data[3]);
    })
    
    getCustomerCount().then((response) => {
      setTotalCustomers(response.data);
    })
  }

  return (
    <div>
      <div className='grid grid-cols-2 gap-x-4 gap-y-8 p-4'>
        {/* Card 1 */}
        <div className='row-span-2 flex flex-col justify-center items-center border-2 rounded-lg shadow-lg p-2'>
          <div className='text-sm'>Total Revenue</div>
          <div className='text-3xl'>${totalRevenue}</div>
        </div>
        {/* Card 2 */}
        <div className='border-2 rounded-lg shadow-lg p-2'>
          <div className='text-sm'>Orders Delivered</div>
          <div className='text-3xl'>{ordersDelivered}</div>
        </div>
        {/* Card 3 */}
        <div className='border-2 rounded-lg shadow-lg p-2'>
          <div className='text-sm'>Orders Pending</div>
          <div className='text-3xl'>{ordersPending}</div>
        </div>
        {/* Card 4 */}
        <div className='col-span-2 border-2 rounded-lg shadow-lg p-2'>
          <div className='text-sm'>Payments Receivables</div>
          <div className='text-3xl'>${amountReceivable}</div>
        </div>
        {/* Card 5 */}
        <div className='border-2 rounded-lg shadow-lg p-2 flex flex-col items-center justify-center'>
          <div className='text-sm'>Total Customers</div>
          <div className='text-3xl'>{totalCustomers}</div>
        </div>
        {/* Card 6 */}
        <div className='border-2 rounded-lg shadow-lg p-2'>
          <div className='text-sm'>Top 3 Customers</div>
          <div className='mx-4'>
            <ol className='list-disc'>
              <li>Customer 1</li>
              <li>Customer 2</li>
              <li>Customer 3</li>
            </ol>
          </div>
        </div>
      </div>
      
    </div>
  )
}
