import React, { useState } from 'react';
import axios from 'axios';
import '../styles/forgotpassword.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config'; // Adjust path based on file location

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate=useNavigate();
  const handleEmailSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)
    
    try {
      // Sends a POST request to the API endpoint with the email address
      const response = await axios.post(`${BASE_URL}/PasswordReset?toEmail=${email}`);
      
      // Checks if the response status is 200 (OK)
      if (response.status === 200) {
        setSuccess('OTP sent to email'); // Sets a success message if the request is successful
        setError(''); // Clears any previous error messages
        // Redirect to EnterOTP page with email parameter
        setTimeout(() => {
          //<Link className="text-danger" to={`/EnterOTP?email=${encodeURIComponent(email)}`}>Forgot password?</Link>
         // window.location.href = `http://185.199.52.133:8080/urbanwheels/#/EnterOTP?email=${encodeURIComponent(email)}`;
          navigate(`/EnterOTP?email=${encodeURIComponent(email)}`);
        }, 2000); // Redirects after 2 seconds
      } else {
        setError('Email not found'); // Sets an error message if the email is not found
      }
    } catch (err) {
      setError('An error occurred'); // Sets a generic error message if an exception occurs
      console.error(err); // Logs the error to the console
    }
  };
  
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <form className="signup-form contact-form" id="email-form" onSubmit={handleEmailSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="fs-4">Enter email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-100">
                Send OTP
              </button>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
