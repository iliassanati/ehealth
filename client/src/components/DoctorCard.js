import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import Rating from '../components/Rating.js';

const DoctorCard = ({ doctor }) => {
  return (
    <Row>
      <Col>
        <Card className='my-3 p-3 rounded'>
          <Link to={`/doctor/${doctor._id}`}>
            <Card.Img src={doctor.image} variant='top' />
            <Card.Body>
              <Card.Title as='div' className='text-center'>
                <strong>
                  {doctor.titre} {doctor.prenom} {doctor.nom}
                </strong>
              </Card.Title>
              <Card.Text as='p' className='text-center'>
                <i className='fas fa-map-pin'></i> {doctor.addressCabinet}{' '}
                {doctor.ville}
              </Card.Text>
              <Card.Text as='h6' className='text-center'>
                <i className='fas fa-phone-square-alt'></i>{' '}
                {doctor.phoneCabinet}
              </Card.Text>

              <Card.Text as='div' className='text-center'>
                <Rating value={doctor.rating} text={`Reviews`} />
              </Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </Col>
    </Row>
  );
};

export default DoctorCard;
