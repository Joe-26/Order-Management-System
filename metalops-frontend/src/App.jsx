import './App.css'
import Dashboard from './components/Dashboard'
import CustomerList from './components/CustomerList'
import OrderList from './components/OrderList'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddCustomer from './components/AddCustomer'
import AddOrder from './components/AddOrder'
import CustomerInfo from './components/CustomerInfo'
import OrderInfo from './components/OrderInfo'

function App() {

  return (
    <>
      <BrowserRouter>

      <Header />
      <Routes>
        <Route path='/' element={<Dashboard/>} />

        <Route path='/customers' element={<CustomerList/>} />
        <Route path='/add-customer' element={<AddCustomer />}/>
        <Route path='/edit-customer/:id' element={<AddCustomer />}/>
        <Route path='/customers/:id' element={<CustomerInfo />}/>

        <Route path='/orders' element={<OrderList />} />
        <Route path='/add-order' element={<AddOrder />}/>
        <Route path='/edit-order/:id' element={<AddOrder />}/>
        <Route path='/orders/:id' element={<OrderInfo />} />
      </Routes>
      <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
