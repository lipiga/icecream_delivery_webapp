import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo} alt=''/>
                  <p>© 2025 Grocify. Bringing you fresh, high-quality groceries at your convenience. Shop smart, eat fresh, and enjoy hassle-free delivery. Privacy Policy | Terms of Service</p>
                <div className='footer-social-icons'>
                      <img src={assets.facebook} alt='' />
                      <img src={assets.twitter} alt='' />
                      <img src={assets.linkedin_icon} alt='' />
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91 88709 22682</li>
                    <li>grocify@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'> ©Copyright 2025 grocify.com - All right reserved.</p>
    </div>
  )
}

export default Footer