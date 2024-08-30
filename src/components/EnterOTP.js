import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const EnterOTP = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [enteredOtp, setEnteredOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:1995/ValidateOtp?otp=${enteredOtp}&email=${email}`);
      
      if (response.status === 200) {
        setSuccess('OTP verified. You can now reset your password.');
        setError('');
        // Redirect to the password reset page
        navigate(`/PasswordReset?email=${encodeURIComponent(email)}`);
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <form onSubmit={handleOtpSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="otp" className="fs-4">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                name="otp"
                placeholder="Enter OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-100">
                Verify OTP
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

export default EnterOTP;
