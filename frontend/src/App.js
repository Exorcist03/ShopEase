import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes> 
        {/* defining of the route paths here which tell this link will open which page */}
        <Route path='/' element = {<Shop/>}></Route>
        <Route path='/mens' element = {<ShopCategory banner = {men_banner} category = "men"/>}></Route>
        <Route path='/women' element = {<ShopCategory banner = {women_banner} category = "women" />}></Route>
        <Route path='/kids' element = {<ShopCategory banner = {kid_banner} category = "kid"/>}></Route>
        {/* // set the route for our product */}
        <Route path='/product' element = {<Product/>}>
          <Route path=':productId' element={<Product/>}></Route>
        </Route>
        <Route path='/cart' element = {<Cart/>}></Route>
        <Route path='/login' element = {<LoginSignup/>}></Route>
        {/* now link this route with the navigation bar */}
      </Routes>
      <Footer/> 
      {/* footer will be shown in all the links here as it is in app.js */}
      </BrowserRouter>
      
    </div>
  );
}

export default App;
