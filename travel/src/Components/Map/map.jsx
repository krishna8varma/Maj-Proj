import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const parseLocation = (locationString) => {
  const [lat, lng] = locationString.split(',').map(parseFloat);
  return { lat, lng };}
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

  return (
    <LoadScript googleMapsApiKey="AIzaSyA4AvOjg-H-DV4ZrKzhflFtmefi7RwMBzk">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{ lat: 21.7679, lng: 78.8718 }} // Default center
        zoom={10}
        onLoad={(map) => {
          mapRef.current = map;
          console.log(selectedLocation)
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