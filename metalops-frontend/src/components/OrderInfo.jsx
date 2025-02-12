import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteOrder, getOrder } from '../service/OrderService';

export default function OrderInfo() {
  const [order, setOrder] = useState({});
  const {id} = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    getOrderInfo();
  }, []);

  function getOrderInfo() {
    getOrder(id).then((response) => {
      setOrder(response.data);
    }).catch((error) => {
      console.error(error)
    })
  }

  function editOrder() {
      navigator(`/edit-order/${id}`)
  }

  function removeOrder() {
    deleteOrder(id).then((response) => {
      console.log(response.data);
      navigator('/orders')
    }).catch((e) => {
      console.error(e);
    })
  }

  return (
    <div className='p-4'>
      {/* Title */}
      <div className='text-2xl mb-4'>OrderInfo</div>

      {/* Order Info */}
      <table className='flex w-full'>
        <tbody className='font-[Monda]'>
          <tr>
            <td className='px-2 w-1/2'>Order Id</td>
            <td>:</td>
            <td className='px-2 font-[Gudea]'>{order.orderId}</td>
          </tr>
          <tr>
            <td className='px-2'>Customer ID</td>
            <td>:</td>
            <td className='px-2 font-[Gudea]'>{order.customerId}</td>
          </tr>
          <tr>
            <td className='px-2'>Order Date</td>
            <td>:</td>
            <td className='px-2 font-[Gudea]'>{order.orderDate}</td>
          </tr>
          <tr>
            <td className='px-2'>Order Status</td>
            <td>:</td>
            <td className='px-2 font-[Gudea]'>{order.orderStatus}</td>
          </tr>
          <tr>
            <td className='px-2'>Amount</td>
            <td>:</td>
            <td className='px-2'>${order.totalAmount}</td>
          </tr>
          <tr>
            <td className='px-2'>Payment Status</td>
            <td>:</td>
            <td className='px-2 font-[Gudea]'>{order.paymentStatus}</td>
          </tr>
        </tbody>
      </table>

      {/* Buttons */}
      <div className='mt-4 flex gap-4'>
        <button className='border rounded-lg py-2 px-4 bg-blue-600 text-white text-sm flex items-center justify-center gap-2 w-1/2 font-[Gudea] font-bold' onClick={editOrder}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <div>Edit</div>
        </button>
        <button className='border rounded-lg py-2 px-4 bg-red-600 text-white text-sm flex items-center justify-center gap-2 w-1/2 font-[Gudea] font-bold' onClick={removeOrder}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          <div>Delete</div>
        </button>
      </div>
    </div>
  )
}
