import React from 'react';
import GoogleMapReact from 'google-map-react';

const MapComponent = ({ center, zoom }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBOafEOI8TSEZGgjGfjOG2fqGn2zkzQJbY' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* Add markers or other map elements here */}
      </GoogleMapReact>
    </div>
  );
};

MapComponent.defaultProps = {
  center: {
    lat: 51.5074, // Default latitude (e.g., London)
    lng: -0.1278, // Default longitude (e.g., London)
  },
  zoom: 10, // Default zoom level
};

export default MapComponent;