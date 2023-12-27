import React from 'react'
import "../styles/Landing.css";

const Landing = () => {
  return (
    <div className='landing-main'>
    <h1>Landing Page</h1>
    <p>Hello and welcome!</p>
    <button className="landing-login-button">Login</button>
    <button className="landing-register-button">Register</button>
  </div>
  )
}

export default Landing