import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, ListGroup, Card, Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import Message from '../components/Message';
import Loader from '../components/Loader.js';
import moment from 'moment';
import { RDV_PAY_RESET } from '../constants/rdvConstants';
import {
  doctorGetRdvDetails,
  patientGetRdvDetails,
  deliverRdv,
  payRdv,
} from '../actions/rdvActions.js';

const OrderScreen = ({ match, history }) => {
  const rdvId = match.params.id;

  const [timeLeft, setTimeLeft] = useState(0);

  const dispatch = useDispatch();

  const rdvDetails = useSelector(state => state.rdvDetails);
  const { rdv, error, loading } = rdvDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const doctorLogin = useSelector(state => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  const rdvPay = useSelector(state => state.rdvPay);
  const { loading: loadingPay, success: successPay } = rdvPay;

  const rdvDeliver = useSelector(state => state.rdvDeliver);
  const { loading: loadingDeliver, success: successDeliver } = rdvDeliver;

  useEffect(() => {
    const findTimeLeft = () => {
      const minLeft = new Date(rdv.expiresAt) - new Date();
      setTimeLeft(Math.round(minLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    if (!rdv._id || successPay || successDeliver) {
      dispatch({ type: RDV_PAY_RESET });
      if (userInfo) {
        dispatch(patientGetRdvDetails(rdvId));
      } else {
        dispatch(doctorGetRdvDetails(rdvId));
      }
    }

    return () => {
      clearInterval(timerId);
    };
  }, [dispatch, rdv, rdvId, successPay, userInfo, history, successDeliver]);

  const payOrderHandler = token => {
    console.log(token.id);
    dispatch(payRdv(token.id, rdv._id));
  };

  const deliverHandler = () => {
    dispatch(deliverRdv(rdv));
  };

  if (timeLeft < 0) {
    return <div>Rdv Expired</div>;
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <p> Time left to pay: {timeLeft} seconds</p>
                <h2>Date de rendez-vous</h2>

                <p>
                  <strong>Date: </strong>{' '}
                  {moment(rdv.rdvDate).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
                {rdv.isDelivered ? (
                  <Message variant='success'>
                    Delivered on{' '}
                    {moment(rdv.deliveredAt).format('MMMM Do YYYY, h:mm a')}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong> {rdv.paymentMethod}
                </p>
                {rdv.isPaid ? (
                  <Message variant='success'>
                    Paid on {moment(rdv.paidAt).format('MMMM Do YYYY, h:mm a')}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Reference du rendez-vous</h2>
                <p>
                  <strong> Rendez-vous numéro: </strong>
                  {rdv._id}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Resume de rdv</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Type de consultation</Col>
                    <Col>{rdv.typeConsultation}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Prix de consultation</Col>
                    <Col>{rdv.rdvPrix} MAD</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{rdv.taxPrice} MAD</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{rdv.totalPrice} MAD</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>

                {!rdv.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    <StripeCheckout
                      token={token => payOrderHandler(token)}
                      stripeKey='pk_test_51ICwtAG4v7xutw0nScewa89wHKnVY9QnlAuT7yLL1gTsWr0ogJGNsaIijpaAzb0sfQaRKh2ylDUt5gPSamsQhQWH00xHZqhuts'
                      amount={rdv.totalPrice * 100}
                      email={userInfo && userInfo.email}
                      currency='MAD'
                    />
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loader />}
                {doctorInfo && rdv.isPaid && !rdv.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

//

export default OrderScreen;
