import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ selectedLocation }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.panTo({
        lat: parseFloat(selectedLocation[0]),
        lng: parseFloat(selectedLocation[1]),
      });
    }
  }, [selectedLocation]);

  const defaultCenter = {
    lat: parseFloat(selectedLocation[0]),
    lng: parseFloat(selectedLocation[1])
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyA4AvOjg-H-DV4ZrKzhflFtmefi7RwMBzk">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={defaultCenter}
        zoom={10}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {selectedLocation && (
          <Marker position={{ lat: parseFloat(selectedLocation[0]), lng: parseFloat(selectedLocation[1]) }} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
