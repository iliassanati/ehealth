import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Card, Row, InputGroup } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/rdvInfoActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { getDoctorInfo } from '../actions/doctorActions.js';
import moment from 'moment';

const PayementScreen = ({ history, match }) => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const dispatch = useDispatch();

  const doctorInfoById = useSelector(state => state.doctorInfoById);
  const { loading, doctor, error } = doctorInfoById;

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
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col>
          <p>Heure de votre rendez-vous:</p>
          <InputGroup size='lg'>
            <InputGroup.Prepend>
              <InputGroup.Text id='inputGroup-sizing-lg'>
                {moment(date).format('MMMM Do YYYY, h:mm a')}
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
          <Card>
            <Card.Img variant='top' src={doctor.image} />
            <Card.Body>
              <Card.Title>
                {doctor.titre} {doctor.nom} {doctor.prenom}{' '}
              </Card.Title>
              <Card.Title>{doctor.specialite}</Card.Title>
              <Card.Text>{doctor.addressCabinet}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>

              <Col>
                <Form.Check
                  type='radio'
                  label='Credit Card'
                  id='creditCard'
                  name='paymentMethod'
                  value='Credit Card'
                  checked
                  onChange={e => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>

              <Col>
                <Form.Check
                  type='radio'
                  label='Paypal'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  disabled
                  onChange={e => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default PayementScreen;
