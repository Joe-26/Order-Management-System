import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createOrder, getOrder, updateOrder } from '../service/OrderService';
import { format } from 'date-fns';

export default function AddOrder() {
  const[customerId, setCustomerId] = useState('');
  const[orderDate, setOrderDate] = useState('');
  const[orderStatus, setOrderStatus] = useState('');
  const[totalAmount, setTotalAmount] = useState('');
  const[paymentStatus, setPaymentStatus] = useState('');

  const {id} = useParams();
  const navigator = useNavigate();
  const [errors, setErrors] = useState({
    customerId: '',
    orderDate: '',
    orderStatus: '',
    totalAmount: '',
    paymentStatus: ''
  });

  useEffect(()=>{
    if(id){
      
      getOrder(id).then((response) =>{
        console.log(new Date(response.data.orderDate));
        setCustomerId(response.data.customerId);
        setOrderStatus(response.data.orderStatus);
        setTotalAmount(response.data.totalAmount);
        setPaymentStatus(response.data.paymentStatus);
        setOrderDate(format(new Date(response.data.orderDate), "yyyy-MM-dd"));
        
      })
    }
  }, [])

  function saveOrUpdateOrder(e) {
    e.preventDefault();

    if(validateForm()) {
      const newOrder = {customerId, orderDate, orderStatus, totalAmount, paymentStatus};
      console.log('Order => ', newOrder);

      if(id){
        updateOrder(id, newOrder).then((response) => {
          console.log(response.data);
          navigator('/orders')
        }).catch((error) => {
          console.error(error);
        })
      }else {
        createOrder(newOrder).then((response) => {
          console.log(response.data);
          navigator('/orders')
        }).catch((error) => {
          console.error(error);
        });
      } 
    }    
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = {... errors};

    if(customerId) {
      errorsCopy.customerId = '';
        
    }else {
        errorsCopy.customerId = 'Customer ID is required';
        valid = false;
    }

    if(orderDate.trim()) {
        errorsCopy.orderDate = '';
        
    }else {
        errorsCopy.orderDate = 'Order Date is required';
        valid = false;
    }

    if(totalAmount) {
        errorsCopy.totalAmount = '';
        
    }else {
        errorsCopy.totalAmount = 'Amount is required';
        valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if(id) {
      return <div className='text-2xl font-bold'>Update/Edit Order</div>
    } else {
      return <div className='text-2xl font-bold'>New Order</div>
    }
  }

  function actionButton() {
    if(id) {
      return <span>Update</span>
    } else {
      return <span>Add</span>
    }
  }

  return (
    <div className='p-4'>
      {pageTitle()}

      {/* Form */}
      <div className='mt-4'>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='customerId'>Customer ID</label>
            <input 
              type='number' 
              id='customerId' 
              className='border rounded-lg px-3 py-1' 
              placeholder='1234'
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
            {errors.customerId && <div className='text-red-500 text-xs'>{errors.customerId}</div>}
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='orderDate'>Order Date</label>
            <input 
              type='date' 
              id='orderDate' 
              className='border rounded-lg px-3 py-1' 
              placeholder='Company'
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
            {errors.orderDate && <div className='text-red-500 text-xs'>{errors.orderDate}</div>}
          </div>

          <div className='flex flex-col gap-1'>
            <div>
              <label htmlFor='orderStatus'>Order Status</label>
            </div>
            <div className='flex gap-2'>
              <input 
                type="radio" 
                id="shipped" 
                name="orderStatus" 
                value="Shipped"
                checked={orderStatus === "Shipped"}
                onChange={(e) => setOrderStatus(e.target.value)} 
              />
              <label htmlFor="shipped">Shipped</label>
              <input 
                type="radio" 
                id="processing" 
                name="orderStatus" 
                value="Processing"
                checked={orderStatus === "Processing"}
                onChange={(e) => setOrderStatus(e.target.value)} 
              />
              <label htmlFor="processing">Processing</label>
              <input 
                type="radio" 
                id="delivered" 
                name="orderStatus" 
                value="Delivered"
                checked={orderStatus === "Delivered"}
                onChange={(e) => setOrderStatus(e.target.value)} 
              />
              <label htmlFor="delivered">Delivered</label>
              <input 
                type="radio" 
                id="canceled" 
                name="orderStatus" 
                value="Canceled"
                checked={orderStatus === "Canceled"}
                onChange={(e) => setOrderStatus(e.target.value)} 
              />
              <label htmlFor="canceled">Canceled</label>
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='amount'>Total Amount (in USD)</label>
            <input 
              type='text' 
              id='amount' 
              className='border rounded-lg px-3 py-1' 
              placeholder='5000'
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
            {errors.totalAmount && <div className='text-red-500 text-xs'>{errors.totalAmount}</div>}
          </div>

          <div className='flex flex-col gap-1'>
            <div>
                <label htmlFor='paymentStatus'>Payment Status</label>
              </div>
              <div className='flex gap-2'>
                <input 
                  type="radio" 
                  id="paid" 
                  name="paymentStatus" 
                  value="Paid"
                  checked={paymentStatus === "Paid"}
                  onChange={(e) => setPaymentStatus(e.target.value)} 
                />
                <label htmlFor="paid">Paid</label>
                <input 
                  type="radio" 
                  id="pending" 
                  name="paymentStatus" 
                  value="Pending"
                  checked={paymentStatus === "Pending"}
                  onChange={(e) => setPaymentStatus(e.target.value)} 
                />
                <label htmlFor="pending">Pending</label>
                <input 
                  type="radio" 
                  id="refunded" 
                  name="paymentStatus" 
                  value="Refunded"
                  checked={paymentStatus === "Refunded"}
                  onChange={(e) => setPaymentStatus(e.target.value)} 
                />
                <label htmlFor="refunded">Refunded</label>
              </div>
          </div>

          <button className='border rounded-lg py-2 px-4 bg-blue-600 text-white text-sm' onClick={saveOrUpdateOrder}>{actionButton()}</button>
        </form>
      </div>

    </div>
  )
}
