import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

const user = localStorage.getItem('username') || 'Guest';


  const handleLogout = () => {
    localStorage.clear();  
    navigate('/');
  };


  const goToProfile = () => {
    navigate('/profile'); // assuming you have a profile route
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">My Dashboard</span>
          <div className="d-flex ms-auto">
            <span className="navbar-text text-white me-3">
              Hello, <strong>{user}</strong>
            </span>
            <button className="btn btn-outline-light me-2" onClick={goToProfile}>
              Profile
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container text-center mt-5">
        <h1>Welcome, {user }!</h1>
        <p className="lead">This is your simple dashboard.</p>
      </div>
    </>
  );
}

export default Dashboard;
