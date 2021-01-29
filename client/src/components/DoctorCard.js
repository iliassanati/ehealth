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
              <Card.Title as='div'>
                <strong>
                  {doctor.titre} {doctor.prenom} {doctor.nom}
                </strong>
              </Card.Title>

              <Card.Text as='div'>
                <Rating value={doctor.rating} text={`reviews`} />
              </Card.Text>
              <Card.Text as='h6'>{doctor.phoneCabinet}</Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </Col>
    </Row>
  );
};

export default DoctorCard;
