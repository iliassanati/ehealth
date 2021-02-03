import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Card, Row, InputGroup } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/rdvInfoActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { getDoctorInfo } from '../actions/doctorActions.js';
import moment from 'moment';
import Rating from '../components/Rating';

const PayementScreen = ({ history, match }) => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const dispatch = useDispatch();

  const doctorInfoById = useSelector(state => state.doctorInfoById);
  const { doctor } = doctorInfoById;

  const rdvInfo = useSelector(state => state.rdvInfo);
  const { date } = rdvInfo;

  useEffect(() => {
    if (!doctor.nom) {
      dispatch(getDoctorInfo(match.params.id));
    }
  }, [match, dispatch, doctor]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push(
      `/patient/login?redirect=/doctor/${match.params.id}/placeorder`
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 doctor={doctor} />
      <h1>Prendre rendez-vous en ligne</h1>
      <br />
      <Row>
        <Col md={5}>
          <p>Heure de votre rendez-vous:</p>
          <InputGroup size='lg'>
            <InputGroup.Prepend>
              <InputGroup.Text id='inputGroup-sizing-lg'>
                {moment(date).format('MMMM Do YYYY, h:mm a')}
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
          <br />
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
                <Rating value={doctor.rating} text={` Reviews`} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7} style={{ paddingTop: '9.5rem' }}>
          <Card>
            <Card.Title
              className='text-center'
              style={{ paddingTop: '1.5rem' }}
            >
              Methode de payment
            </Card.Title>
            <Card.Body center>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label as='legend'>
                    Selectionner votre methode de payment:
                  </Form.Label>

                  <Form.Control as='radio' required>
                    <Form.Check
                      type='radio'
                      label='Credit Card'
                      id='creditCard'
                      name='paymentMethod'
                      value='Credit Card'
                      checked
                      onChange={e => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                  </Form.Control>

                  <Form.Control as='radio' required>
                    <Form.Check
                      type='radio'
                      label='Paypal'
                      id='PayPal'
                      name='paymentMethod'
                      value='PayPal'
                      disabled
                      onChange={e => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                  </Form.Control>
                </Form.Group>
                <Col className='text-right'>
                  <Button type='submit' variant='primary'>
                    Continuer
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PayementScreen;
