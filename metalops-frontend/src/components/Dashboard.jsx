import React, { use, useEffect, useState } from 'react'
import { getDashboardData, getTopCustomers } from '../service/OrderService'
import { getCustomer, getCustomerCount } from '../service/CustomerService';

export default function Dashboard() {
  const [totalRevenue, setTotalRevenue] = useState();
  const[ordersPending, setOrdersPending] = useState();
  const[ordersDelivered, setOrdersDelivered] = useState();
  const[amountReceivable, setAmountReceivable] = useState();
  const [totalCustomers, setTotalCustomers] = useState();
  const [customer1, setCustomer1] = useState('');
  const [customer2, setCustomer2] = useState('');
  const [customer3, setCustomer3] = useState('');

  useEffect(() => {
    getDash();
  }, [])


  function getDash() {
    getDashboardData().then((response) => {
      setTotalRevenue(response.data[0]);
      setAmountReceivable(response.data[1]);
      setOrdersDelivered(response.data[2]);
      setOrdersPending(response.data[3]);
    })
    
    getCustomerCount().then((response) => {
      setTotalCustomers(response.data);
    })

    getTopCustomers().then((r) => {
      getCustomer(r.data[0]).then((response) => {
        setCustomer1(response.data['name']);
      });
      
      getCustomer(r.data[1]).then((response) => {
        setCustomer2(response.data['name']);
      });

      getCustomer(r.data[2]).then((response) => {
        setCustomer3(response.data['name']);
      });
    })

    
  }

  return (
    <div >
      <div className='px-4 pt-4'>
        <div className='text-4xl font-[Changa] font-bold'>Business Insights</div>
        <div className='font-extralight font-[Gudea]'>Stay ahead with data that matters.</div>
      </div>
      
      <div className='grid grid-cols-2 gap-x-4 gap-y-8 p-4 w-full'>
        {/* Card 1 */}
        <div className='row-span-2 flex flex-col justify-center items-center border-3 rounded-lg shadow-lg p-2 bg-green-300'>
          <div className='text-sm font-[Monda]'>Total Revenue</div>
          <div className='text-3xl font-bold text-green-900'>${totalRevenue}</div>
        </div>
        {/* Card 2 */}
        <div className='border-3 rounded-lg shadow-lg p-2 bg-blue-300'>
          <div className='text-sm font-[Monda]'>Orders Delivered</div>
          <div className='text-3xl font-bold text-blue-900'>{ordersDelivered}</div>
        </div>
        {/* Card 3 */}
        <div className='border-3 rounded-lg shadow-lg p-2 bg-rose-300'>
          <div className='text-sm font-[Monda]'>Orders Pending</div>
          <div className='text-3xl font-bold text-rose-900'>{ordersPending}</div>
        </div>
        {/* Card 4 */}
        <div className='col-span-2 border-3 rounded-lg shadow-lg p-2 bg-orange-300'>
          <div className='text-sm font-[Monda]'>Payments Receivables</div>
          <div className='text-3xl font-bold text-orange-900'>${amountReceivable}</div>
        </div>
        {/* Card 5 */}
        <div className='border-3 rounded-lg shadow-lg p-2 flex flex-col items-center justify-center bg-green-300'>
          <div className='text-sm font-[Monda]'>Total Customers</div>
          <div className='text-3xl font-bold text-green-900'>{totalCustomers}</div>
        </div>
        {/* Card 6 */}
        <div className='border-3 rounded-lg shadow-lg p-2 bg-violet-300'>
          <div className='text-sm font-[Monda]'>Top 3 Customers</div>
          <div className='mx-4'>
            <ol className='list-disc font-bold text-violet-900'>
              <li>{customer1}</li>
              <li>{customer2}</li>
              <li>{customer3}</li>
            </ol>
          </div>
        </div>
      </div>
      
    </div>
  )
}
