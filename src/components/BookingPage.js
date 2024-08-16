import React, { useState, useEffect } from 'react';
import MapComponent from '../components/mapComponent';
import { useCookies } from 'react-cookie';
import { useLocation, useParams } from 'react-router-dom';

const BookingPage = () => {
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
            driver,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          alert('Booking confirmed.');
          console.log('Booking confirmed:', result);
          // Handle successful booking
        } else {
          throw new Error('Network response was not ok');
        }
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
