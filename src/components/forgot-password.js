import React, { useState } from 'react';
import '../styles/forgotpassword.css'; 

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };
 
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <form className="signup-form contact-form" id="register-form" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="fs-4">Enter email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="fs-4">New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label className="fs-4">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmpassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="hidden" name="token" value="" />
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-100">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
