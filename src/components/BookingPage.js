import React, { useState } from 'react';
import MapComponent from '../components/mapComponent';
import { useCookies } from 'react-cookie';
import { useLocation, useParams } from 'react-router-dom';

const BookingPage = () => {
  const location = useLocation();
  const perKmRate = location.state?.perKmRate || 0; 
  const params=useParams();
  const [cookies,setCookie,removeCookie]=useCookies();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [fromDateTime, setFromDateTime] = useState('');
  const [toDateTime, setToDateTime] = useState('');
  const [price, setPrice] = useState('');
  const [distanceInKm, setDistanceInKm] = useState('');
  const [currStatus, setCurrStatus] = useState('');
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

  const handleLocationSelect = (location) => {
    setPickupLocation(location);
  };

  const handleConfirmBooking = async () => {
    if (pickupLocation && fromDateTime && toDateTime ) {
      try {
        const uuid=cookies.uuid;
        const cabId=params.cabId;
        debugger;
        console.log(
          JSON.stringify({
            tripBookingId: 0, // Replace with actual value
            pickupLocation,
            dropLocation,
            fromDateTime,
            toDateTime,
            price,
            distanceInKm,
            currStatus,
            driver
          })

        );
        const response = await fetch(`http://localhost:1995/tripBooking/BookRequest?cabId=${cabId}&uuid=${uuid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tripBookingId: 0, // Replace with actual value
            pickupLocation,
            dropLocation,
            fromDateTime,
            toDateTime,
            price,
            distanceInKm,
            currStatus,
            driver
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Booking confirmed:', result);
        alert('Booking confirmed.');
        // Handle successful booking
      } catch (error) {
        console.error('Error confirming booking:', error);
        // Handle errors
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
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input readOnly
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleConfirmBooking}
            disabled={!pickupLocation  || !fromDateTime || !toDateTime   }
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
