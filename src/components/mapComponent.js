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

  const onMapClick = useCallback(
    async (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });

      const address = await getAddressFromLatLng(lat, lng);
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
        onLocationSelect(address);
      }
    }
  };

  return isLoaded ? (
    <div style={{ marginTop: '100px' }}>
      <Autocomplete
        onLoad={onLoadAutocomplete}
        onPlaceChanged={onPlaceChanged}
      >
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
        />
      </Autocomplete>

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
