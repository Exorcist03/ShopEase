import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Admin from './Pages/Admin.jsx'
import AddProduct from './components/Addproduct/AddProduct.jsx'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Admin/>
      {/* <AddProduct/> */}
    </div>
  )
}

export default App
