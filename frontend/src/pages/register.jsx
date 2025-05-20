import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password, first_name, last_name } = form;

    if (!username || !email || !password) {
      Swal.fire('Validation Error', 'Username, email, and password are required.', 'warning');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire('Validation Error', 'Please enter a valid email address.', 'warning');
      return false;
    }

    if (password.length < 6) {
      Swal.fire('Validation Error', 'Password must be at least 6 characters long.', 'warning');
      return false;
    }

    const nameRegex = /^[A-Za-z\s]*$/;
    if (first_name && !nameRegex.test(first_name)) {
      Swal.fire('Validation Error', 'First name should not contain numbers or special characters.', 'warning');
      return false;
    }

    if (last_name && !nameRegex.test(last_name)) {
      Swal.fire('Validation Error', 'Last name should not contain numbers or special characters.', 'warning');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post('http://127.0.0.1:8000/register/', form, {
        headers: { 'Content-Type': 'application/json' },
      });

      Swal.fire({
        icon: 'success',
        title: 'Registered Successfully',
        text: res.data.message,
      }).then(() => navigate('/'));
    } catch (err) {
      console.error('err', err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.response?.data?.error || 'Unknown error',
      });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '1rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          padding: '2rem',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: 6,
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#000' }}>
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {['username', 'email', 'password', 'first_name', 'last_name'].map((field) => (
            <div key={field} style={{ marginBottom: '1rem' }}>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={
                  field === 'first_name' || field === 'last_name'
                    ? `${field.replace('_', ' ')} (optional)`
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={form[field]}
                onChange={handleChange}
                required={!(field === 'first_name' || field === 'last_name')}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                  color: '#000',
                }}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 4,
              border: 'none',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#333' }}>
          Already have an account?{' '}
          <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
