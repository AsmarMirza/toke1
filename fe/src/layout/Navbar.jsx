import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div style={{width:"100%",display:"flex",gap:"30px",textDecoration:"none"}}>
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signin"}>SignIn</Link>
    </div>
  )
}

export default Navbar