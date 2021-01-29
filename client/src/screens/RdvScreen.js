import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Card, InputGroup, Form, Button } from 'react-bootstrap';
import { saveRenseignements } from '../actions/rdvInfoActions';
import CheckoutSteps from '../components/CheckoutSteps';
import moment from 'moment';
import { getDoctorInfo } from '../actions/doctorActions';

const RdvScreen = ({ history, match }) => {
  const [etatClient, setEtatClient] = useState('Je suis un nouveau patient');
  const [typeConsultation, setTypeConsultation] = useState('');
  const [renseignementMedicaux, setRenseignementMedicaux] = useState('');

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
    dispatch(
      saveRenseignements({
        etatClient,
        typeConsultation,
        renseignementMedicaux,
      })
    );
    history.push(`/patient/login?redirect=/doctor/${match.params.id}/payment`);
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h1>Prendre rendez-vous en ligne</h1>
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
        <Col md={7}>
          <Form onSubmit={submitHandler}>
            <h5>AVEZ-VOUS DÉJÀ CONSULTÉ CE PRATICIEN AUPARAVANT ?</h5>

            <Form.Group>
              <Form.Control as='radio'>
                <Form.Check
                  type='radio'
                  id='defaultRadio'
                  name='groupOptions'
                  label='Je suis un nouveau patient'
                  value='Je suis un nouveau patient'
                  onChange={e => setEtatClient(e.target.value)}
                />
                <Form.Check
                  type='radio'
                  id='defaultRadio'
                  name='groupOptions'
                  label='Je suis déjà patient de ce médecin'
                  value='Je suis déjà patient de ce médecin'
                  onChange={e => setEtatClient(e.target.value)}
                />
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='type'>
              <Form.Label>Type de consultation</Form.Label>
              <Form.Control
                as='select'
                value={typeConsultation}
                onChange={e => setTypeConsultation(e.target.value)}
              >
                <option>Choisissez une</option>
                <option>Consultation en presentiel</option>
                <option>Teleconsultation</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Renseignements medicaux</Form.Label>
              <Form.Control
                as='textarea'
                value={renseignementMedicaux}
                onChange={e => setRenseignementMedicaux(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group controlId='password'>
          <Form.Label>Prix de la consultation</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter votre mot de passe'
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group> */}
            <Button type='submit' variant='primary'>
              Valider
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default RdvScreen;
