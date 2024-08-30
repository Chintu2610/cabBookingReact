import React, { useState, useEffect } from 'react';
import MapComponent from '../components/mapComponent';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const BookingPage = () => {
  const navigate=useNavigate();

  const location = useLocation();
  const perKmRate = location.state?.perKmRate || 0;
  const { cabId } = useParams();
  const [cookies] = useCookies();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [fromDateTime, setFromDateTime] = useState('');
  const [toDateTime, setToDateTime] = useState('');
  const [price, setPrice] = useState(0);
  const [distanceInKm, setDistanceInKm] = useState(0);
  const [currStatus, setCurrStatus] = useState('');
  const [preferredGender, setpreferredGender] = useState('Male'); // preferredGender state
  const [driver, setDriver] = useState({
    userName: '',
    password: '',
    address: '',
    mobileNumber: '',
    email: '',
    userRole: '',
    driverId: '',
    licenceNo: '',
    rating: '',
    currLocation: '',
    currDriverStatus: '',
  });

  useEffect(() => {
    // Calculate the price whenever fromDateTime or toDateTime changes
    const calculatePrice = () => {
      if (fromDateTime && toDateTime) {
        const fromDate = new Date(fromDateTime);
        const toDate = new Date(toDateTime);
        const durationInHours = (toDate - fromDate) / (1000 * 60 * 60);
        setPrice(durationInHours * perKmRate);
      }
    };
    calculatePrice();
  }, [fromDateTime, toDateTime, perKmRate]);

  const handleLocationSelect = (location) => {
    setPickupLocation(location);
  };

  const handleConfirmBooking = async () => {
    if (pickupLocation && fromDateTime && toDateTime) {
      try {
        debugger;
        console.log(preferredGender);
        const response = await fetch(`http://localhost:1995/tripBooking/BookRequest?cabId=${cabId}&uuid=${cookies.uuid}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tripBookingId: 0, // Replace with actual value
            pickupLocation,
            dropLocation,
            fromDateTime,
            toDateTime,
            price,
            distanceInKm,
            currStatus,
            preferredGender, // Include preferredGender in the request
            driver,
          }),
        });

        if (response.ok) {
          const result = await response.text();
          alert(result);
         
          navigate('/booking-history-customer');
          // Handle successful booking
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error confirming booking:', error);
        // Accessing the error message from Axios response
        if (error.response) {
          // Server responded with a status other than 2xx
          const errorMessage = error.response.data.message || 'An error occurred while confirming the booking.';
          alert(`Error: ${errorMessage}`);
        } else if (error.request) {
          // The request was made but no response was received
          alert('No response received from the server.');
        } else {
          // Something else happened in setting up the request
          alert(`Error: ${error.message}`);
        }
      }
      
    } else {
      console.log('Please fill in all required fields');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Select Pickup Location</h2>
      <MapComponent onLocationSelect={handleLocationSelect} />
      <form>
        <div className="mb-3">
          <label htmlFor="fromDateTime" className="form-label">From Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="fromDateTime"
            value={fromDateTime}
            onChange={(e) => setFromDateTime(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="toDateTime" className="form-label">To Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="toDateTime"
            value={toDateTime}
            onChange={(e) => setToDateTime(e.target.value)}
          />
        </div>
        <div className="mb-3 col-md-5">
          <label htmlFor="preferredGender" className="form-label">Preferred Gender of Driver</label>
          <select
            className="form-control"
            id="preferredGender"
            value={preferredGender}
            onChange={(e) => setpreferredGender(e.target.value)}
          >
            
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            readOnly
          />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleConfirmBooking}
            //disabled={!pickupLocation || !fromDateTime || !toDateTime}
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
