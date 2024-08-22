import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const AdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState({
    userName: '',
    password: '',
    address: '',
    mobileNumber: '',
    email: '',
    userRole: ''
  });
  const [error, setError] = useState(null);
  const [adminId, setAdminId] = useState(''); // State for admin ID
  const [uuid, setUuid] = useState(''); // State for UUID
  const [cookies] = useCookies();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  

  const fetchAdminDetails = async () => {
    var URL="";
    if(cookies.currRole==='Admin' || cookies.currRole==='Vendor'){
      URL=`http://localhost:1995/admin/viewAdminProfile?adminId=${cookies.currUserId}&uuid=${cookies.uuid}`;
    }else if(cookies.currRole==='Customer') {
      URL=`http://localhost:1995/customer/viewCustomerProfile?customerId=${cookies.currUserId}&uuid=${cookies.uuid}`;
    }else{
      URL=`http://localhost:1995/driver/viewDriverProfile?driverId=${cookies.currUserId}&uuid=${cookies.uuid}`;
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
        URL=`http://localhost:1995/admin/Update?adminId=${cookies.currUserId}&uuid=${cookies.uuid}`;
      }else if(cookies.currRole==='Customer') {
        URL=`http://localhost:1995/customer/update?customerId=${cookies.currUserId}&uuid=${cookies.uuid}`;
      }else{
        URL=`http://localhost:1995/driver/update?driverId=${cookies.currUserId}&uuid=${cookies.uuid}`;
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
          userRole: adminDetails.userRole
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

  return (
    <div 
      className="container" 
      style={{
        marginTop: "100px",
        padding: '50px'
      }}
    >
      <div className="row justify-content-center">
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
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"} // Toggle between password and text
                        className="form-control"
                        id="password"
                        name="password"
                        value={adminDetails.password || ''}
                        onChange={handleInputChange}
                        readOnly // Make the password field read-only
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
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
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userRole" className="form-label">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userRole"
                      name="userRole"
                      value={adminDetails.userRole || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
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
