import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4, step5, doctor }) => {
  return (
    <Nav className='justify-content-center mb-5'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/patient/login'>
            <Nav.Link>Se connecter</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Se connecter</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to={`/doctor/${doctor._id}`}>
            <Nav.Link>Doctor Info</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Doctor Info</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to={`/doctor/${doctor._id}/rdvinfo`}>
            <Nav.Link>Rdv Info</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Rdv Info</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to={`/doctor/${doctor._id}/payment`}>
            <Nav.Link>Payement</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payement</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step5 ? (
          <LinkContainer to={`/doctor/${doctor._id}/placeorder`}>
            <Nav.Link>Reserver maintenant</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Reserver maintenant</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
