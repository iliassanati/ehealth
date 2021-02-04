import React from 'react';

const LocationInfoBox = ({ doctor }) => {
  return (
    <div className='location-info'>
      <h4>Adresse du cabinet</h4>
      <ul>
        <li>
          {doctor.titre}
          <strong>
            {doctor.nom} {doctor.prenom}
          </strong>
        </li>
        <li>
          Adresse:{' '}
          <strong>
            {doctor.addressCabinet} {doctor.ville}
          </strong>
        </li>
      </ul>
    </div>
  );
};

export default LocationInfoBox;
