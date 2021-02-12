import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { register } from '../../actions/userActions';

const PatientRegisterScreen = ({ location, history }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPaasword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(register(nom, prenom, email, phone, password));
    }
  };

  return (
    <FormContainer>
      <h1>
        <i className='fas fa-user-plus'></i> CREATION DU COMPTE
      </h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Row>
          <Form.Group as={Col} md='6' controlId='nom'>
            <Form.Label>Nom </Form.Label>
            <Form.Control
              type='nom'
              placeholder='Enter votre nom'
              value={nom}
              onChange={e => setNom(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} md='6' controlId='prenom'>
            <Form.Label>Prenom</Form.Label>
            <Form.Control
              type='prenom'
              placeholder='Enter votre prénom'
              value={prenom}
              onChange={e => setPrenom(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md='6' controlId='email'>
            <Form.Label>Adresse Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter votre adresse email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} md='6' controlId='phone'>
            <Form.Label>Numero de telephone</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter votre numero de telephone'
              value={phone}
              onChange={e => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId='password'>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter votre mot de passe'
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirmer mot de passe</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirmer votre mot de passe'
            value={confirmPassword}
            onChange={e => setConfirmPaasword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Créer mon compte
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <p>Vous avez un compte ?</p>
          <Link
            to={
              redirect
                ? `/patient/login?redirect=${redirect}`
                : '/patient/login'
            }
          >
            <p>Connecter vous</p>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default PatientRegisterScreen;
