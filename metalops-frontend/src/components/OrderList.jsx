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
      <div className='text-2xl'>Orders</div>

      {/* Input & Add Button */}
      <div className='mt-4 flex items-center justify-between gap-2'>
        <div className='flex place-items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input 
            type='text' 
            className='border rounded-full px-3 py-1' 
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
        <button className='border rounded-lg py-2 px-4 bg-blue-600 text-white text-sm' onClick={addOrder}>Add Order</button>
      </div>

      {/* Order Table */}
      <div className='mt-4'>  
        <table className="table-auto w-full">
          <thead>
            <tr className='border bg-amber-300'>
              <th>Id</th>
              <th>Date</th>
              <th>Order Status</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map(
                order => 
                <tr key={order.orderId} className='border'>
                  <td className='px-2'>{order.orderId}</td>
                  <td className='px-2'>{format(new Date(order.orderDate), "MM/dd/yy")}</td>
                  <td>{order.orderStatus}</td>
                  <td>${order.totalAmount}</td>
                  <td className='flex justify-end px-2'>{order.paymentStatus}</td>
                  <td>&#9432;</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
