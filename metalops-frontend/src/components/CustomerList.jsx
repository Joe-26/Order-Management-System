import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { listCustomers } from '../service/CustomerService';

export default function CustomerList() {

  const [customers, setCustomers] = useState([])
  const navigator = useNavigate();
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
      getAllCustomers();
  }, [])

  function getAllCustomers() {
      listCustomers().then((response) => {
          setCustomers(response.data);
      }).catch((error) => {
          console.error(error);
      });
  }

  function addCustomer() {
    navigator('/add-customer');
  }

  function searchCustomer() {
    console.log('Search Customer - ', customerId);
    navigator(`/customers/${customerId}`);
  }

  return (
    <div className='p-4'>
      <div className='text-2xl'>Customer List</div>

      {/* Input & Add Button */}
      <div className='mt-4 flex items-center justify-between gap-2'>
        <div className='flex place-items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input 
            type='text' 
            className='border rounded-full px-3 py-1' 
            placeholder='Customer Id'
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchCustomer();
              }
            }}
          />
        </div>
        <button className='border rounded-lg py-2 px-4 bg-blue-600 text-white text-sm' onClick={addCustomer}>Add Customer</button>
      </div>

      {/* Customer Table */}
      <div className='mt-4'>  
        <table className="table-auto border w-full">
          <thead>
            <tr className='border'>
              <th>Id</th>
              <th>Name</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {
              customers.map(
                customer => 
                <tr key={customer.customerId}>
                  <td className='px-2'>{customer.customerId}</td>
                  <td>{customer.name}</td>
                  <td>{customer.companyName}</td>
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
