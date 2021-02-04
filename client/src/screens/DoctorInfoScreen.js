import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createDoctorReview, getDoctorInfo } from '../actions/doctorActions';
import { userGetRdvs } from '../actions/rdvActions';
import { saveDate } from '../actions/rdvInfoActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Rating from '../components/Rating.js';
import { DOCTOR_CREATE_REVIEW_RESET } from '../constants/doctorConstants';
import Map from '../components/Map';
import Calendar from '../components/DateTimePicker';

const DoctorInfoScreen = ({ match, history }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const doctorInfoById = useSelector(state => state.doctorInfoById);
  const { loading, doctor, error } = doctorInfoById;

  console.log(doctor);

  // const doctorRdvList = useSelector(state => state.doctorRdvList);
  // const { rdvs } = doctorRdvList;

  const doctorReviewCreate = useSelector(state => state.doctorReviewCreate);
  const {
    success: successDoctorReview,
    error: errorDoctorReview,
  } = doctorReviewCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userRdvsDetails = useSelector(state => state.userRdvsDetails);
  const { rdvs } = userRdvsDetails;

  useEffect(() => {
    if (!doctor.nom) {
      dispatch(getDoctorInfo(match.params.id));
      dispatch(userGetRdvs(match.params.id));
    }
    if (successDoctorReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: DOCTOR_CREATE_REVIEW_RESET });
      dispatch(getDoctorInfo(match.params.id));
    }
  }, [dispatch, match, successDoctorReview, doctor, rdvs]);

  const handleScheduled = date => {
    dispatch(saveDate(date));
    history.push(`/patient/login?redirect=/doctor/${match.params.id}/rdvinfo`);
  };

  const timeSlotValidator = slotTime => {
    const morningTime = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      8,
      30,
      0
    );

    const eveningTime = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      18,
      0,
      0
    );

    const isValid =
      slotTime.getTime() > morningTime.getTime() &&
      slotTime.getTime() < eveningTime.getTime();

    return isValid;
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createDoctorReview(match.params.id, {
        nom: userInfo.nom,
        prenom: userInfo.prenom,
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className='btn btn-light my-2' to='/'>
        Revenir à la page précedante
      </Link>
      <CheckoutSteps step1 step2 doctor={doctor} />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {' '}
          <Row>
            <Col md={6}>
              <Card className='text-center'>
                <Card.Img variant='top' src={doctor.image} />
                <Card.Body center>
                  <Card.Title>
                    {doctor.titre} {doctor.nom} {doctor.prenom}{' '}
                  </Card.Title>
                  <Card.Title>{doctor.specialite}</Card.Title>
                  <Card.Text>
                    {doctor.addressCabinet} {doctor.ville}
                  </Card.Text>
                  <Card.Text as='div'>
                    <Rating value={doctor.rating} text={`reviews`} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Calendar
                handleScheduled={handleScheduled}
                timeSlotValidator={timeSlotValidator}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Card>
                <Card.Title className='text-center'>
                  {' '}
                  Informations du médecin
                </Card.Title>
                <ListGroup variant='flush'>
                  <Row>
                    <Col style={{ padding: '1.5rem' }}>Prix Consultation:</Col>
                    <Col style={{ padding: '1.5rem' }}>
                      <strong>{doctor.prixConsultation} MAD</strong>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ padding: '1.5rem' }}>
                      Diplomes et Formations:
                    </Col>
                    <Col style={{ padding: '1.5rem' }}>
                      <strong>{doctor.diplomesEtFormations}</strong>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ padding: '1.5rem' }}>Description:</Col>
                    <Col style={{ padding: '1.5rem' }}>
                      <strong>{doctor.description}</strong>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ padding: '1.5rem' }}>
                      Informations pratiques:
                    </Col>
                    <Col style={{ padding: '1.5rem' }}>
                      <strong></strong>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ padding: '1.5rem' }}>
                      Telephone du cabinet:
                    </Col>
                    <Col style={{ padding: '1.5rem' }}>
                      <strong>{doctor.phoneCabinet}</strong>
                    </Col>
                  </Row>
                </ListGroup>
              </Card>
            </Col>
            <Col md={5} as='div' className='map-doctor-info'>
              <Map doctor={doctor} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {doctor.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {doctor.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>
                      {review.nom} {review.prenom}
                    </strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorDoctorReview && (
                    <Message variant='danger'>{errorDoctorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Pauvre</option>
                          <option value='2'>2 - Acceptable</option>
                          <option value='3'>3 - Bien</option>
                          <option value='4'>4 - Tres bien</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default DoctorInfoScreen;
