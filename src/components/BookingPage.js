import React, { useState } from 'react';
import MapComponent from '../components/mapComponent';

const BookingPage = () => {
  const [pickupLocation, setPickupLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setPickupLocation(location);
  };

  const handleConfirmBooking = () => {
    if (pickupLocation) {
      console.log('Pickup Location:', pickupLocation);
      // Proceed with booking logic
    }
  };

  return (
    <div>
      <h2>Select Pickup Location</h2>
      <MapComponent onLocationSelect={handleLocationSelect} />
      <button
        className="btn btn-primary mt-3"
        onClick={handleConfirmBooking}
        disabled={!pickupLocation}
      >
        Confirm Location
      </button>
    </div>
  );
};

export default BookingPage;
