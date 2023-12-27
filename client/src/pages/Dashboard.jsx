import React from 'react'
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className='dashboard-main'>
      <h1>Dashboard</h1>
      <p>Hi Kuzma! This is your lucky number 59</p>
      <button className="logout-button">Logout</button>
    </div>
  )
}

export default Dashboard