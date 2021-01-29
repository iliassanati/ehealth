import React from 'react';

const LocationInfoBox = ({ doctor }) => {
  return (
    <div className='location-info'>
      <h2>Location Informations</h2>
      <ul>
        <li>
          Nom
          <strong>{doctor.Nom}</strong>
        </li>
        <li>
          Adresse: <strong>{doctor.addressCabinet}</strong>
        </li>
      </ul>
    </div>
  );
};

export default LocationInfoBox;
