import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const AdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [error, setError] = useState(null);
  const [adminId, setAdminId] = useState(''); // State for admin ID
  const [uuid, setUuid] = useState(''); // State for UUID
  const [cookies] = useCookies();

  useEffect(() => {
    setUuid(cookies.uuid);
    setAdminId(cookies.currUserId);
    fetchAdminDetails();
  }, [cookies]);

  const fetchAdminDetails = async () => {
    try {
      const response = await fetch(`http://localhost:1995/admin/viewAdminProfile?adminId=${adminId}&uuid=${uuid}`);
      
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
    if (adminId && uuid) {
      fetchAdminDetails();
    }
  }, [adminId, uuid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h2>Admin Profile</h2>

      {error && <p className="text-danger mt-3">{error}</p>}

      {adminDetails ? (
        <div className="mt-4">
          <input
            type="text"
            name="adminId"
            placeholder="Admin ID"
            value={adminDetails.adminId || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="uuid"
            placeholder="UUID"
            value={adminDetails.uuid || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={adminDetails.address || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={adminDetails.email || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={adminDetails.mobileNumber || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={adminDetails.password || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={adminDetails.userName || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="userRole"
            placeholder="Role"
            value={adminDetails.userRole || ''}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminProfile;
