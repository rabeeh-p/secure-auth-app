import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../Redux/authSlce';
import Swal from 'sweetalert2';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/login/', form);
      const { access, refresh } = res.data;
      const username = res.data.user.username;

      dispatch(setCredentials({ access, refresh, username }));

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('username', username);

      // SweetAlert success
      await Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${username}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
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
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="identifier"
              placeholder="Username or Email"
              value={form.identifier}
              onChange={handleChange}
              required
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
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
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
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#333' }}>
          Don't have an account?{' '}
          <a href="/register" style={{ color: '#000', textDecoration: 'underline' }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
