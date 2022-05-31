import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import User from '../../utils/User'
import './style.css'
import logo from "../../assets/logo.png"
function Navbar() {

  const LogOut = () => {
    User()?.logOut();
    window.location.reload()
  }
 
  const [small, setActive] = useState(false)
  

  const handleClick = () =>{
    setActive(!small)
  }
  return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
            <Link className="navbar_brand" to="/">
                <img src={logo} alt="logo" width={"25%"} />
            </Link>
            <button 
                className="navbar-toggler bg-danger" 
                onClick={() => handleClick()}
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`align-items-center justify-content-center  ${small ? '_v2' :'d-none'}`} id="navbarSupportedContent">
            <Link className='navbar_links' to="#">ABOUT US</Link>
            <Link className='navbar_links' to="/request-blood">REQUEST BLOOD</Link>
            <Link className='navbar_links' to="#">DONATE BLOOD</Link>
            { !User() ? <Link className='navbar_links btn btn_small_black' to="/login">Login</Link>
            :<>
            <Link to='/dashboard' className='navbar_links'>Dashboard</Link>
            <button className='navbar_links btn btn_small_brand' onClick={()=>LogOut()}>Logout</button>
            </> }
            </div>
        </nav>
  )
}

export default Navbar