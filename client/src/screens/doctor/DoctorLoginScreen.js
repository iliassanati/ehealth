import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { login } from '../../actions/doctorActions';

const DoctorLoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const doctorLogin = useSelector(state => state.doctorLogin);
  const { loading, error, doctorInfo } = doctorLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (doctorInfo) {
      history.push(redirect);
    }
  }, [history, doctorInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Espace Medecin</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Adresse Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter votre email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Mot de Passe</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter votre mot de passe'
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Se connecter
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <p>Vous etes un medecin?</p>
          <Link
            to={
              redirect
                ? `/doctor/register?redirect=${redirect}`
                : '/doctor/register'
            }
          >
            <p>
              {' '}
              Optimisez la gestion de votre cabinet pour gagner en productivité
              en quelques clics
            </p>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default DoctorLoginScreen;
