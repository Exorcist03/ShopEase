import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {
    const [menu, setmenu] = useState("shop")
    const {gettotalcartitems} = useContext(ShopContext);
    const menuref = useRef(); // for closing the navbar for smaller screen
    // pass this to the ul tag

    // when we click on the image then this function will be executed
    const drop_downtoggle =  (e) => {
      menuref.current.classList.toggle('nav-menu-visible'); // if class name not there then it will come if it is there then it will go away
      e.target.classList.toggle('open');
    }
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>ShopEase</p>
      </div>
      <img className='navbar-dropdown' onClick={drop_downtoggle} src={nav_dropdown} alt="" />
      <ul ref={menuref} className="nav-menu">
        <li onClick={()=>setmenu("shop")}> <Link to='/' style={{textDecoration: 'none'}}>Shop</Link>  {menu === "shop" ? <hr/> : <></>} </li>
        <li onClick={()=>setmenu("men")}> <Link to ='/mens' style={{textDecoration: 'none'}}> Men</Link> {menu === "men" ? <hr/> : <></>} </li>
        <li onClick={()=>setmenu("women")}> <Link to='/women' style={{textDecoration: 'none'}}> Women</Link>  {menu === "women" ? <hr/> : <></>} </li>
        <li onClick={()=>setmenu("kids")}><Link to='/kids' style={{textDecoration: 'none'}}> Kids</Link> {menu === "kids" ? <hr/> : <></>} </li>
      </ul>
      <div className="nav-login-cart">
        {/* if local storage has one token availabel then show logout option */}
        {localStorage.getItem('auth-token') ? 
        <button onClick={()=> {localStorage.removeItem('auth-token');
          window.location.replace("/");
        }}>Logout</button> : <Link to = '/login'> <button>Login</button> </Link>}
        <Link to = '/cart'> <img src={cart_icon} alt="" /> </Link>
        <div className="nav-cart-count">{gettotalcartitems()} </div>
      </div>
    </div>
  )
}


export default Navbar
