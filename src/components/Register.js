import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ferariImage from './images/cabImages/ferari.jpeg'; // Renamed the imported image for clarity


const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    address: '',
    mobileNumber: '',
    email: '',
    userRole: 'Customer'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://13.60.224.153:1995/customer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div 
      className="container" 
      style={{
        marginTop: "100px",
        backgroundImage: `url(${ferariImage})`, // Use the imported variable
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        padding: '50px', 
        height: '100vh'
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">User Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    pattern="(?=.*[A-Za-z])(?=.*\d).{8,}"
                    title="Password must contain at least 8 characters, including at least one letter and one number"
                    name="password"
                    id="password"
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobileNumber"
                    name="mobileNumber"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input type="hidden" id="userRole" name="userRole" value="Customer" />
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <div className="row mt-3">
                <div className="col text-end">
                  <Link className="text-muted" to="/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;