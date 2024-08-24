import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'


export const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home")
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext)
    const navigate = useNavigate()

    const logout = ()=>{
      localStorage.removeItem("token")
      setToken("")
      navigate("/")
    }
  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt='' /></Link>
        <ul className='navbar-menu'>
              <Link to='/' onClick={()=>setMenu("home")} className={menu === "home" ? "active" : ""} >Home</Link>
              <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
              <a href='#footer' onClick={()=>setMenu("services")} className={menu === "services" ? "active" : ""}>Services</a>
              <a href='#footer' onClick={()=>setMenu("contactus")} className={menu === "contactus" ? "active" : ""}>Contact Us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search} alt=''/>
            <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.cart} alt='' /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in </button>:
        <div className='navbar-profile'>
          <img src={assets.user} alt='' />
          <ul className='nav-profile-dropdown'>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag} alt='' /><p>Orders</p></li>
            <hr/>
              <li onClick={logout}><img src={assets.logout} alt='' /><p>logout</p></li>
          </ul>
        </div>
        }
            
        </div>
    </div>
  )
}


