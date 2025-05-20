import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('username') || 'Guest';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
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
  );
};

export default Navbar;
