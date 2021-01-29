import React from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import mapPin from '@iconify-icons/fa-solid/map-pin';

const LocationMarker = ({ lat, lng, onClick }) => {
  return (
    <div className='location-marker' onClick={onClick}>
      <Icon icon={mapPin} className='map-pin' />
    </div>
  );
};

export default LocationMarker;
