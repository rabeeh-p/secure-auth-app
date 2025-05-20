import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

const EditProfile = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });
        const { first_name, last_name, email } = res.data;
        setForm({ first_name, last_name, email });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUser();
  }, [navigate]);

  const validate = () => {
    const newErrors = {};

    if (!form.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    } else if (!/^[A-Za-z]+$/.test(form.first_name.trim())) {
      newErrors.first_name = 'First name must contain only letters';
    }

    if (!form.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    } else if (!/^[A-Za-z]+$/.test(form.last_name.trim())) {
      newErrors.last_name = 'Last name must contain only letters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email.trim())
    ) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; 
    }

    try {
      await axios.put('http://127.0.0.1:8000/profile/', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile updated successfully',
        confirmButtonColor: '#000',
      }).then(() => {
        navigate('/profile');
      });
    } catch (error) {
      console.error('Error updating profile:', error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update profile',
        confirmButtonColor: '#000',
      });
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.6rem',
    marginBottom: errors[field] ? '0.25rem' : '1.2rem',
    borderRadius: 5,
    border: errors[field] ? '1.5px solid red' : '1px solid #bbb',
    fontSize: '1rem',
    color: '#000',
    outline: 'none',
  });

  const errorTextStyle = {
    color: 'red',
    marginBottom: '1rem',
    fontSize: '0.85rem',
    fontWeight: '600',
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          maxWidth: 480,
          margin: '3rem auto',
          padding: '2rem',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        }}
      >
        <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#000' }}>
          Edit Profile
        </h3>
        <form onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="first_name"
            style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '600' }}
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            style={inputStyle('first_name')}
            autoComplete="off"
          />
          {errors.first_name && <div style={errorTextStyle}>{errors.first_name}</div>}

          <label
            htmlFor="last_name"
            style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '600' }}
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            style={inputStyle('last_name')}
            autoComplete="off"
          />
          {errors.last_name && <div style={errorTextStyle}>{errors.last_name}</div>}

          <label
            htmlFor="email"
            style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '600' }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle('email')}
            autoComplete="off"
          />
          {errors.email && <div style={errorTextStyle}>{errors.email}</div>}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 6,
              border: 'none',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#222')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000')}
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
