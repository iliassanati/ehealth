import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const PatientProfileScreen = ({ location, history }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/patient/login');
    } else {
      if (!user || !user.email || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setNom(user.nom);
        setPrenom(user.prenom);
        setEmail(user.email);
        setPhone(user.phone);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(
        updateUserProfile({ id: user._id, nom, prenom, email, phone, password })
      );
    }
  };

  return (
    <>
      <Row>
        <Col>
          {userInfo && (
            <h3>
              <br /> <i className='fas fa-medical'></i> Bonjour{' '}
              {userInfo.prenom}{' '}
            </h3>
          )}
          <Nav className='justify-content-center mb-4'>
            <Nav.Item>
              <LinkContainer to='/patient/profile'>
                <Nav.Link className='btn btn-light my-3'>
                  <i className='fas fa-user'></i> Mon profile
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to='/patient/rdvs'>
                <Nav.Link className='btn btn-light my-3'>
                  {' '}
                  <i className='fas fa-calendar-alt'> </i> Mes rdvs
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to='/patient/agenda'>
                <Nav.Link className='btn btn-light my-3'>
                  <i className='fas fa-calendar-week'></i> Mon agenda
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <h5 className='text-center'>
              Modfier les informations de votre profile
            </h5>
            <br />
            <Form.Group controlId='nom'>
              <Form.Label>Nom </Form.Label>
              <Form.Control
                type='nom'
                placeholder='Enter votre nom'
                value={nom}
                onChange={e => setNom(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='prenom'>
              <Form.Label>Prenom</Form.Label>
              <Form.Control
                type='prenom'
                placeholder='Enter votre prénom'
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Numero de telephone</Form.Label>
              <Form.Control
                type='phone'
                placeholder='Enter votre numero de telephone'
                value={phone}
                onChange={e => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Col className='text-right'>
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default PatientProfileScreen;
