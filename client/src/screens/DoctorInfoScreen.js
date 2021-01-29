import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Figure, ListGroup, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createDoctorReview, getDoctorInfo } from '../actions/doctorActions';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import { saveDate } from '../actions/rdvInfoActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Rating from '../components/Rating.js';
import { DOCTOR_CREATE_REVIEW_RESET } from '../constants/doctorConstants';

const DoctorInfoScreen = ({ match, history }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const doctorInfoById = useSelector(state => state.doctorInfoById);
  const { loading, doctor, error } = doctorInfoById;

  const doctorReviewCreate = useSelector(state => state.doctorReviewCreate);
  const {
    success: successDoctorReview,
    error: errorDoctorReview,
  } = doctorReviewCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successDoctorReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: DOCTOR_CREATE_REVIEW_RESET });
    }
    dispatch(getDoctorInfo(match.params.id));
  }, [dispatch, match, successDoctorReview]);

  const handleScheduled = date => {
    dispatch(saveDate(date));
    history.push(`/patient/login?redirect=/doctor/${match.params.id}/rdvinfo`);
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(createDoctorReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Revenir à la page précedante
      </Link>
      <CheckoutSteps step1 step2 />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {' '}
          <Row>
            <Col>
              <Figure>
                <Figure.Image
                  width={342}
                  height={360}
                  alt='171x180'
                  src={doctor.image}
                />
                <Figure.Caption>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </Figure.Caption>
              </Figure>
            </Col>
            <Col>
              <DayTimePicker
                timeSlotSizeMinutes={30}
                onConfirm={handleScheduled}
              />
            </Col>
          </Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {doctor.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
              {doctor.reviews.map(review => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
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
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
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
        </>
      )}
    </>
  );
};

export default DoctorInfoScreen;
