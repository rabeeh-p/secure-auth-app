import React from 'react';
import Navbar from '../components/Navbar'; 

function Dashboard() {
  const user = localStorage.getItem('username') || 'Guest';

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <h1>Welcome, {user}!</h1>
        <p className="lead">This is your simple dashboard.</p>
      </div>
    </>
  );
}

export default Dashboard;
