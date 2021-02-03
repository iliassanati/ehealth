import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, ListGroup, Card, Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import Message from '../components/Message';
import Loader from '../components/Loader.js';
import moment from 'moment';
import { RDV_PAY_RESET, RDV_DELIVER_RESET } from '../constants/rdvConstants';
import {
  doctorGetRdvDetails,
  patientGetRdvDetails,
  deliverRdv,
  payRdv,
  cancelledRdvDelete,
} from '../actions/rdvActions.js';

const OrderScreen = ({ match, history }) => {
  const rdvId = match.params.id;

  const [timeLeft, setTimeLeft] = useState(0);

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const doctorLogin = useSelector(state => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  const rdvDetails = useSelector(state => state.rdvDetails);
  const { rdv, error, loading } = rdvDetails;

  const rdvPay = useSelector(state => state.rdvPay);
  const { loading: loadingPay, success: successPay } = rdvPay;

  const rdvDeliver = useSelector(state => state.rdvDeliver);
  const { loading: loadingDeliver, success: successDeliver } = rdvDeliver;

  const deleteCancelledRdv = useSelector(state => state.deleteCancelledRdv);
  const { success: deleteSuccess } = deleteCancelledRdv;

  useEffect(() => {
    if (!rdv || !rdv._id || successPay || successDeliver || deleteSuccess) {
      dispatch({ type: RDV_PAY_RESET });
      dispatch({ type: RDV_DELIVER_RESET });

      if (userInfo || rdv) {
        dispatch(patientGetRdvDetails(rdvId));
      } else {
        dispatch(doctorGetRdvDetails(rdvId));
      }
    }

    if (rdv) {
      if (rdv.status !== 'complete') {
        const findTimeLeft = () => {
          const minLeft = new Date(rdv.expiresAt) - new Date();
          setTimeLeft(Math.round(minLeft / 1000));
        };
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
          clearInterval(timerId);
        };
      }
    }
  }, [
    dispatch,
    rdv,
    rdvId,
    successPay,
    userInfo,
    successDeliver,
    deleteSuccess,
  ]);

  const payOrderHandler = token => {
    dispatch(payRdv(token.id, rdv._id));
  };

  const deliverHandler = () => {
    dispatch(deliverRdv(rdv));
  };

  if (timeLeft < 0) {
    setTimeLeft(0);
    dispatch(cancelledRdvDelete(rdvId));
    alert("Le Rdv est supprime, Essayer de payer avec l'expiration du temsp");
    // dispatch({ type: RDV_DELETE_CANCELLED_RESET });
    history.push('/');
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={7}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                {!deleteSuccess && !isNaN(timeLeft) && (
                  <Message variant='primary'>
                    {' '}
                    Temps restant pour effectuer le payment: {timeLeft} seconde
                  </Message>
                )}

                <h2>Date du rendez-vous</h2>

                <p>
                  <strong>Date: </strong>{' '}
                  {rdv && moment(rdv.rdvDate).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
                {rdv && rdv.isDelivered ? (
                  <Message variant='success'>
                    Consultation est faite le:{' '}
                    {moment(rdv.deliveredAt).format('MMMM Do YYYY, h:mm a')}
                  </Message>
                ) : (
                  <Message variant='danger'>
                    Consultation n'a pas encore eu lieu
                  </Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Methode de payement</h2>
                <p>
                  <strong>Methode: </strong> {rdv && rdv.paymentMethod}
                </p>
                {rdv && rdv.isPaid ? (
                  <Message variant='success'>
                    Rdv est paye le :{' '}
                    {rdv && moment(rdv.paidAt).format('MMMM Do YYYY, h:mm a')}
                  </Message>
                ) : (
                  <Message variant='danger'>
                    Le rdv n'est pas encore paye
                  </Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Reference du rendez-vous</h2>
                <p>
                  <strong> Rendez-vous numéro: </strong>
                  {rdv && rdv._id}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={5} style={{ paddingTop: '2rem' }}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item className='text-center'>
                  <h2>Resume du rdv</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Type de consultation:</Col>
                    <Col className='text-center'>
                      {rdv && rdv.typeConsultation}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Prix de consultation:</Col>
                    <Col className='text-center'>{rdv && rdv.rdvPrix} MAD</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col className='text-center'>{rdv && rdv.taxPrice} MAD</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col className='text-center'>
                      {rdv && rdv.totalPrice} TTC
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>

                {rdv && !rdv.isPaid && (
                  <ListGroup.Item className='text-center'>
                    {loadingPay && <Loader />}
                    <StripeCheckout
                      token={token => payOrderHandler(token)}
                      stripeKey='pk_test_51ICwtAG4v7xutw0nScewa89wHKnVY9QnlAuT7yLL1gTsWr0ogJGNsaIijpaAzb0sfQaRKh2ylDUt5gPSamsQhQWH00xHZqhuts'
                      amount={rdv && rdv.totalPrice * 100}
                      email={userInfo && userInfo.email}
                      currency='MAD'
                    />
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loader />}
                {rdv && doctorInfo && rdv.isPaid && !rdv.isDelivered && (
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
