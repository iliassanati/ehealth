import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';

const Map = ({ center, zoom, doctor }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  const doctorLat = doctor.location.coordinates[1];
  const doctorLng = doctor.location.coordinates[0];

  return (
    <div className='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD9yHl3vgj69oEh9DN35jPPtc0bhksyK5A' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <LocationMarker lat={doctorLat} lng={doctorLng}></LocationMarker>
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 33.5731,
    lng: -7.5898,
  },
  zoom: 10,
};

export default Map;
