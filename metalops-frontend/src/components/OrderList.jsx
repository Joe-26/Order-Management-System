import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { listOrders } from '../service/OrderService';
import { format } from 'date-fns';

export default function OrderList() {

  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const navigator = useNavigate();

  useEffect(() => {
      getAllOrders();
  }, [])

  function getAllOrders() {
      listOrders().then((response) => {
          setOrders(response.data);
      }).catch((error) => {
          console.error(error);
      });
  }

  function addOrder() {
    navigator('/add-order');
  }

  function searchOrder() {
    console.log('Searching for order - ', orderId);
    navigator(`/orders/${orderId}`)
  }

  return (
    <div className='p-4'>
      <div className='text-2xl font-[Changa] font-bold'>Orders</div>

      {/* Input & Add Button */}
      <div className='mt-4 flex items-center justify-between gap-2'>
        <div className='flex place-items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input 
            type='text' 
            className='border rounded-full px-3 py-1 font-[Gudea]' 
            placeholder='Order Id'
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => {
              if(e.key == 'Enter'){
                searchOrder();
              }
            }}
          />
        </div>
        <button className='border rounded-lg py-2 px-4 bg-blue-600 text-white text-sm font-[Gudea] font-bold' onClick={addOrder}>Add Order</button>
      </div>

      {/* Order Table */}
      <div className='mt-4'>  
        <table className="table-auto border w-full">
          <thead>
            <tr className='border font-[Gudea]'>
              <th className='border-r-1'>Id</th>
              <th className='border-r-1'>Date</th>
              <th className='border-r-1'>Status</th>
              <th className='border-r-1'>Amount</th>
              <th className='px-1'>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map(
                order => 
                <tr key={order.orderId} className=''>
                  <td className='px-1 border-r-1 text-center'>{order.orderId}</td>
                  <td className='px-1 border-r-1'>{format(new Date(order.orderDate), "MM/dd/yy")}</td>
                  <td className='px-1 border-r-1'>{order.orderStatus}</td>
                  <td className='px-1 border-r-1'>${order.totalAmount}</td>
                  <td className='flex justify-end px-1'>{order.paymentStatus} &#9432;</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
