import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const DoctorCard = ({ doctor }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to='/'>
        <Card.Img variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/`}>
          <Card.Title as='div'>
            <strong>
              {doctor.titre}
              {doctor.prenom}
              {doctor.nom}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          {/* <Rating value={product.rating} text={`$ reviews`} /> */}
        </Card.Text>
        <Card.Text as='h3'>{doctor.phone}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
