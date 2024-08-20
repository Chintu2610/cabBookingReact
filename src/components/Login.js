import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {useCaptcha} from '../components/custom-hooks/captcha';
import { useSentenseCase } from './custom-hooks/changeCase';
const Login = () => {
  let code=useCaptcha();
  let title=useSentenseCase('user LoGiN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [cookies,setCookie,removeCookie]=useCookies();

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
        setCookie('currUserId',data.currUserId,{expires:new Date('2025-05-06')});
        setCookie('uuid', data.uuid,{expires:new Date('2025-05-06')});
        setCookie('currRole', data.currRole,{expires:new Date('2025-05-06')});
        setCookie('currStatus', data.currStatus,{expires:new Date('2025-05-06')});
        setCookie('userName', data.userName,{expires:new Date('2025-05-06')});
        setCookie('email', data.email,{expires:new Date('2025-05-06')});
        switch (data.currRole) {
          case 'Admin':
            navigate('/admin-dashboard'); // Redirect to dashboard
            break;
          case 'Customer':
            navigate('/cabs'); // Redirect to dashboard
            break;
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
            <h3 className="text-center mb-4">Welcome Back! Please Log In</h3>
           
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fs-5">Email</label>
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
                  <label htmlFor="password" className="form-label fs-5">Password</label>
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
               
                <button type="submit" className="btn btn-primary w-100 fs-5">Login</button>
              </form>
              <div className="row mt-3">
              <div className="col text-start fs-5 ">
                  <Link className="text-danger" to="/forgot-password">Forgot password?</Link>
                </div>
                <div className="col text-end fs-5">
                  <Link className="text-success" to="/register">Register</Link>
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
