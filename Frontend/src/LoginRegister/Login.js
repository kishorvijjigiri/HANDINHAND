import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password' && value.length > 20) return; // Optional limit
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters long';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields again before submitting
    validateField('email', email);
    validateField('password', password);

    if (email && password && !errors.email && !errors.password) {
      try {
        const response = await axios.post('http://localhost:8080/userdetails/login', {
          email,
          password
        });

        console.log("Login Response:", response.data);

        // Assume backend returns { success: true, user: {...} }
        if (response.status === 200 && response.data ) {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/outer-search');
        } else {
          alert('Invalid email or password. Please try again.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Invalid email or password. Please try again.');
        setFormData({ email: '', password: '' });
        navigate('/searchdonar');
      }
    } else {
      alert('All fields are required or there are errors in the form.');
    }
  };

  return (
    <div style={{ ...props.style }}>
      <div className="containere note1">
        Note:
        <li>If you want to receive blood, first log in with your email ID.</li>
        <li>If you don't have an account, please register first <Link to={"/donateblood"}>here</Link>.</li>
        <li>If you want to receive blood, be prepared to donate as well.</li>
      </div>

      <div className="containere">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className='error' style={{ color: 'red' }}>{errors.email}</p>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className='error' style={{ color: 'red' }}>{errors.password}</p>}
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p className="account">Don't have an account?
          <Link to="/donateblood">
            <button className="btn btn-link">Register</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
