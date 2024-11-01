import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config'; // Adjust path based on file location

const AdminProfile = () => {
  const [cookies] = useCookies();
  const Navigate = useNavigate();
  
useEffect(() => {
  if (!cookies.uuid) {
    Navigate("/login");
  }
}, [cookies.uuid, Navigate]);
  const [adminDetails, setAdminDetails] = useState({
    
    userName: '',
    password: '',
    address: '',
    mobileNumber: '',
    email: '',
   
    currDriverStatus:'',
    firstName:'',
    lastName:'',
    gender:'',
  });
  const [error, setError] = useState(null);
  const [adminId, setAdminId] = useState(''); // State for admin ID
  const [uuid, setUuid] = useState(''); // State for UUID
  
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  
  
  const fetchAdminDetails = async () => {
    var URL="";
    if(cookies.currRole==='Admin' || cookies.currRole==='Vendor'){
      URL=`${BASE_URL}/admin/viewAdminProfile?adminId=${cookies.currUserId}&uuid=${cookies.uuid}`;
    }else if(cookies.currRole==='Customer') {
      URL=`${BASE_URL}/customer/viewCustomerProfile?customerId=${cookies.currUserId}&uuid=${cookies.uuid}`;
    }else{
      URL=`${BASE_URL}/driver/GetDriverDetails?driverid=${cookies.currUserId}&uuid=${cookies.uuid}`;
    }
    try {
      
      const response = await fetch(URL);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setAdminDetails(data);
      setError(null); // Clear any previous error
    } catch (err) {
      setError('Failed to fetch admin details.');
      console.error(err);
    }
  };

  // Update adminDetails when adminId or uuid changes
  useEffect(() => {
    
      fetchAdminDetails();
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var URL="";
      if(cookies.currRole==="Admin" || cookies.currRole==='Vendor'){
        URL=`${BASE_URL}/admin/Update?adminId=${cookies.currUserId}&uuid=${cookies.uuid}`;
      }else if(cookies.currRole==='Customer') {
        URL=`${BASE_URL}/customer/update?customerId=${cookies.currUserId}&uuid=${cookies.uuid}`;
      }else{
        URL=`${BASE_URL}/driver/update?driverId=${cookies.currUserId}&uuid=${cookies.uuid}`;
      }
      const response = await fetch(URL
        
       , {method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: adminDetails.userName,
          password: adminDetails.password,
          address: adminDetails.address,
          mobileNumber: adminDetails.mobileNumber,
          email: adminDetails.email,
          currDriverStatus:adminDetails.currDriverStatus,
          firstName:adminDetails.firstName,
          lastName:adminDetails.lastName,
          gender:adminDetails.gender,
        })
       }
      );

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  var redirect="";
  if(cookies.currRole==="Driver"){
   redirect="/urbanwheels/#/driver-dashboard";
  }else if(cookies.currRole==="Admin")
  {
    redirect="/urbanwheels/#/admin-dashboard";
  }else if(cookies.currRole==="Customer")
    {
      redirect="/urbanwheels/#/";
    }else
    {
    redirect="/urbanwheels/#/vendor-dashboard";
  }
  return (
    <div 
      className="container" 
      style={{
        marginTop: "100px",
        padding: '50px'
      }}
    >
     
      <div className="row justify-content-center">
      <div className="col-12">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href={redirect}>Home</a></li>
                        <li className="breadcrumb-item active">Booking History</li>
                    </ol>
                </div>
        <div className="col-md-5">
          
          <div className="card">
            <div className="card-body">
            

              {error && <p className="text-danger mt-3">{error}</p>}

              {adminDetails ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      name="userName"
                      value={adminDetails.userName || ''}
                      onChange={handleInputChange}
                      required
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={adminDetails.firstName || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={adminDetails.lastName || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                        <label htmlFor="cabCurrStatus" className="form-label fs-5">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={adminDetails.gender || ''}
                          onChange={handleInputChange}
                          className="form-control"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </select>
                       
                      </div>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"} // Toggle between password and text
                        className="form-control"
                        id="password"
                        name="password"
                        value={adminDetails.password || ''}
                        onChange={handleInputChange}
                        hidden // Make the password field read-only
                        required
                      />
                      
                    </div>
                  
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={adminDetails.address || ''}
                      onChange={handleInputChange}
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
                      value={adminDetails.mobileNumber || ''}
                      onChange={handleInputChange}
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
                      value={adminDetails.email || ''}
                      onChange={handleInputChange}
                      required
                      readOnly
                    />
                  </div>
                  
                  {(cookies.currRole==='Driver')&& 
                  <div className="mb-3">
                    <label htmlFor="userRole" className="form-label">Availability</label>
                    <select
                      type="select"
                      className="form-control"
                       id="currDriverStatus"
                       name="currDriverStatus"
                      value={adminDetails.currDriverStatus || ''}
                      onChange={handleInputChange}
                      required
                      
                    >
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                      </select>
                  </div>
                  }
                  <button type="submit" className="btn btn-primary w-100">Update Profile</button>
                </form>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
