import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = { email, password };

    try {
      const response = await fetch('http://localhost:1995/Userlogin/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('currUserId', data.currUserId);
        sessionStorage.setItem('uuid', data.uuid);
        sessionStorage.setItem('currRole', data.currRole);
        sessionStorage.setItem('currStatus', data.currStatus);
        sessionStorage.setItem('userName', data.userName);
        sessionStorage.setItem('email', data.email);

        switch (data.currRole) {
          case 'Admin':
          case 'Customer':
          case 'Driver':
            navigate('/admin-dashboard'); // Redirect to dashboard
            break;
          default:
            navigate('/login'); // Redirect to login if role is unknown
            break;
        }
      } else if (response.status === 401) {
        alert('Invalid email or password. Please try again.');
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container" style={{marginTop: '15rem'}}>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
            <h5 className="text-center mb-4">Welcome Back! Please Log In</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <div className="row mt-3">
                <div className="col text-end">
                  <Link className="text-muted" to="/forgot-password">Forgot password?</Link>
                </div>
                <div className="col text-end">
                  <Link className="text-muted" to="/register">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
