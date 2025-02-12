import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createCustomer, getCustomer, updateCustomer } from '../service/CustomerService';

export default function AddCustomer() {
  const [name, SetName] = useState('');
  const [companyName, SetCompany] = useState('');
  const [email, SetEmail] = useState(''); 
  const [contact, SetContact] = useState('');
  const [address, SetAddress] = useState('');

  const {id} = useParams();
  const navigator = useNavigate();
  const [errors, setErrors] = useState({
    name: '',
    companyName: '',
    email: '',
    contact: '',
    address: ''
    });
  
  useEffect(() => {
    if(id) {
      getCustomer(id).then((response) =>{
        SetName(response.data.name)
        SetCompany(response.data.companyName)
        SetEmail(response.data.email)
        SetContact(response.data.contact)
        SetAddress(response.data.address)
      })
    }
  }, [])

  function saveOrUpdateCustomer(e) {
    e.preventDefault();

    if(validateForm()) {
      const customer = {name, companyName, email, contact, address};
      console.log('Customer => ', customer);

      if(id) {
        updateCustomer(id, customer).then((response) => {
          console.log(response.data);
          navigator('/customers')
        }).catch((error) => {
          console.error(error);
        })
      } else {
          createCustomer(customer).then((response) => {
            console.log(response.data);
            navigator('/customers')
          }).catch((error) => {
            console.error(error);
          });
      }
    }
    
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = {... errors};

    if(name.trim()) {
      errorsCopy.name = '';
        
    }else {
      errorsCopy.name = 'Name is required';
      valid = false;
    }

    if(companyName.trim()) {
      errorsCopy.companyName = '';
        
    }else {
      errorsCopy.companyName = 'Company Name is required';
      valid = false;
    }

    if(email.trim()) {
        errorsCopy.email = '';
        
    }else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    if(contact.trim()) {
      errorsCopy.contact = '';
    }else {
      errorsCopy.contact = 'Contact is required';
      valid = false;
    }
    if(address.trim()) {
      errorsCopy.address = '';
    }else {
      errorsCopy.address = 'Address is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if(id) {
        return <h2 className='text-2xl font-[Changa] font-bold'>Update Customer</h2>
    }else {
        return <h2 className='text-2xl font-[Changa] font-bold'>Add Customer</h2>
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
        <form className='flex flex-col gap-4 font-[Gudea]'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name' className='font-[Monda]'>Name</label>
            <input 
              type='text' 
              id='name' 
              className='border rounded-lg px-3 py-1' 
              placeholder='John Doe'
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />
            {errors.name && <div className='text-red-500 text-xs'>{errors.name}</div>}
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='company' className='font-[Monda]'>Company</label>
            <input 
              type='text' 
              id='company' 
              className='border rounded-lg px-3 py-1' 
              placeholder='Company'
              value={companyName}
              onChange={(e) => SetCompany(e.target.value)}
            />
            {errors.companyName && <div className='text-red-500 text-xs'>{errors.companyName}</div>}
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='font-[Monda]'>Email</label>
            <input 
              type='email' 
              id='email' 
              className='border rounded-lg px-3 py-1' 
              placeholder='john.doe@company.co.in'
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
            {errors.email && <div className='text-red-500 text-xs'>{errors.email}</div>}
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='phone' className='font-[Monda]'>Contact</label>
            <input 
              type='text' 
              id='contact' 
              className='border rounded-lg px-3 py-1' 
              placeholder='417-354-2894' 
              value={contact} 
              onChange={(e) => SetContact(e.target.value)}
            />
            {errors.contact && <div className='text-red-500 text-xs'>{errors.contact}</div>}
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='address' className='font-[Monda]'>Company Address</label>
            <textarea 
              id='address' 
              className='border rounded-lg px-3 py-1' 
              placeholder='472 Peachtree Rd, Atlanta, GA'
              value={address}
              onChange={(e) => SetAddress(e.target.value)}
            />
            {errors.address && <div className='text-red-500 text-xs'>{errors.address}</div>}
          </div>
          <button className='border rounded-lg py-2 px-4 bg-blue-600 text-white text-sm font-[Gudea] font-bold' onClick={saveOrUpdateCustomer}>{actionButton()}</button>
        </form>
      </div>
    </div>
  )
}
