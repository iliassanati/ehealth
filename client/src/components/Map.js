import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';

const Map = ({ center, zoom, doctor }) => {
  let doctorLat;
  let doctorLng;
  if (doctor.location) {
    doctorLat = doctor.location.coordinates[1];
    doctorLng = doctor.location.coordinates[0];
  }

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyD9yHl3vgj69oEh9DN35jPPtc0bhksyK5A' }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <LocationMarker lat={doctorLat} lng={doctorLng}></LocationMarker>
    </GoogleMapReact>
  );
};

Map.defaultProps = {
  center: {
    lat: 33.5731,
    lng: -7.5898,
  },
  zoom: 6,
};

export default Map;
