import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MapComponent = ({ onLocationSelect }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Add your API key to .env
    libraries: ['places'], // Add the 'places' library for search functionality
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState(''); // State for search input value

  // Function to get address from latitude and longitude using Geocoding API
  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      if (response.results[0]) {
        return response.results[0].formatted_address;
      } else {
        console.log('No results found');
        return '';
      }
    } catch (error) {
      console.error('Geocoder failed due to: ' + error);
      return '';
    }
  };

  // Get current location
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const latLng = { lat: latitude, lng: longitude };
          setMarkerPosition(latLng);
          map.panTo(latLng);

          const address = await getAddressFromLatLng(latitude, longitude);
          setSearchInputValue(address); // Update the input value with the address
          onLocationSelect(address);
        },
        (error) => {
          console.error('Error fetching current location: ', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, [map, onLocationSelect]);

  const onMapClick = useCallback(
    async (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });

      const address = await getAddressFromLatLng(lat, lng);
      setSearchInputValue(address); // Update the input value with the clicked location's address
      onLocationSelect(address);
    },
    [onLocationSelect]
  );

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const onLoadAutocomplete = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = async () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMarkerPosition({ lat, lng });
        map.panTo({ lat, lng });

        const address = await getAddressFromLatLng(lat, lng);
        setSearchInputValue(address); // Update the input value with the selected place
        onLocationSelect(address);
      }
    }
  };

  return isLoaded ? (
    <div style={{ marginTop: '100px' }}>
      <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search for a location"
          style={{
            width: '100%',
            height: '40px',
            padding: '10px',
            fontSize: '16px',
            marginBottom: '10px',
          }}
          value={searchInputValue} // Bind the input to the searchInputValue state
          onChange={(e) => setSearchInputValue(e.target.value)} // Update the state when the user types
        />
      </Autocomplete>

      {/* Current Location Button */}
      <button
        onClick={getCurrentLocation}
        style={{
          marginBottom: '10px',
          padding: '10px',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Get Current Location
      </button>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={10}
        onClick={onMapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
        style={{ marginTop: '10px' }}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(MapComponent);
