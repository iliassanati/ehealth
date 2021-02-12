import React from 'react';

const Service = () => {
  return (
    <div id='services' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h3>Nos Services</h3>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <i className='fa fa-user-md'></i>
            <div className='service-desc'>
              <h5>Choisissez votre médecin</h5>
            </div>
          </div>
          <div className='col-md-4'>
            <i className='fa fa-calendar'></i>
            <div className='service-desc'>
              <h5>Prenez rendez-vous en ligne 24h/24</h5>
            </div>
          </div>
          <div className='col-md-4'>
            <i className='fa fa-book'></i>
            <div className='service-desc'>
              <h5>Obtenez votre espace patient dédié</h5>
            </div>
          </div>
          <div className='col-md-4'>
            <i className='fa fa-coins'></i>
            <div className='service-desc'>
              <h5>Un service 100% Gratuit</h5>
            </div>
          </div>
          <div className='col-md-4'>
            <i className='fa fa-map-marker'></i>
            <div className='service-desc'>
              <h5>Assuré partout dans le monde</h5>
            </div>
          </div>
          <div className='col-md-4'>
            <i className='fa fa-film'></i>
            <div className='service-desc'>
              <h5>Des consultations en video</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
