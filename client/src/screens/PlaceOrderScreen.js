import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import { createRdv } from '../actions/rdvActions';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import moment from 'moment';
import { RDV_INFO_RESET } from '../constants/rdvInfoConstants';
import { getDoctorInfo } from '../actions/doctorActions';

const PlaceOrderScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const rdvInfo = useSelector(state => state.rdvInfo);

  const doctorInfoById = useSelector(state => state.doctorInfoById);
  const { doctor } = doctorInfoById;

  //Calculate prices
  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  rdvInfo.taxPrice = addDecimals(
    Number((0.02 * doctor.prixConsultation).toFixed(2))
  );

  rdvInfo.totalPrice = (
    Number(doctor.prixConsultation) + Number(rdvInfo.taxPrice)
  ).toFixed(2);

  const rdvCreate = useSelector(state => state.rdvCreate);
  const { rdv, error, success } = rdvCreate;

  // const rdvInfo = useSelector(state => state.rdvInfo);
  // const { date } = rdvInfo;

  useEffect(() => {
    if (!doctor.nom) {
      dispatch(getDoctorInfo(match.params.id));
    } else {
      if (success) {
        history.push(`/rdv/${rdv._id}`);
        dispatch({ type: RDV_INFO_RESET });
      }
    }
  }, [history, success, match, dispatch, doctor, rdv]);

  const placeOrderHandler = () => {
    const rdv = {
      userNom: userInfo.nom,
      userPrenom: userInfo.prenom,
      userPhone: userInfo.phone,
      doctorId: doctor._id,
      doctorNom: doctor.nom,
      doctorPrenom: doctor.prenom,
      etatClient: rdvInfo.renseignements.etatClient,
      typeConsultation: rdvInfo.renseignements.typeConsultation,
      renseignementMedicaux: rdvInfo.renseignements.renseignementMedicaux,
      paymentMethod: rdvInfo.paymentMethod,
      rdvPrix: doctor.prixConsultation,
      rdvDate: rdvInfo.date,
      taxPrice: rdvInfo.taxPrice,
      totalPrice: rdvInfo.totalPrice,
    };
    dispatch(createRdv(rdv));
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 step5 doctor={doctor} />
      <Row>
        <Col md={7}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Date de rendez-vous</h2>
              <p>
                <strong>Date: </strong>{' '}
                {moment(rdvInfo.date).format('MMMM Do YYYY, h:mm a')}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Methode de payment</h2>
              <strong>Methode: </strong> {rdvInfo.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Informations du medecin</h2>

              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col md={1}>
                      <Image
                        src={doctor.image}
                        alt={doctor.nom}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col>
                      {doctor.titre} {doctor.nom} {doctor.prenom}{' '}
                    </Col>
                    <Col md={4} className='text-center'>
                      {doctor.specialite}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={5}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item className='text-center'>
                <h2>Resume du rdv</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Type de consultation:</Col>
                  <Col className='text-center'>
                    {rdvInfo.renseignements.typeConsultation}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Prix de consultation:</Col>
                  <Col className='text-center'>
                    {doctor.prixConsultation} MAD
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col className='text-center'>{rdvInfo.taxPrice} MAD</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col className='text-center'>{rdvInfo.totalPrice} TTC</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={placeOrderHandler}
                >
                  Confirmer le rendez-vous
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
