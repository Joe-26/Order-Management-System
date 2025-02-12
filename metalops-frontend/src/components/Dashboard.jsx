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
