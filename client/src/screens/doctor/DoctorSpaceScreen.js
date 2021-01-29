import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

const DoctorSpaceScreen = () => {
  const dispatch = useDispatch();

  const doctorLogin = useSelector(state => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  const doctorDetails = useSelector(state => state.doctorDetails);
  const { loading, error, doctor } = doctorDetails;

  return (
    <>
      <Row>
        <Col>
          {/* {doctorInfo && (
            <h1>
              Bonjour {doctorInfo.titre} {doctorInfo.nom}{' '}
            </h1>
          )} */}
          <Nav className='justify-content-center mb-4'>
            <Nav.Item>
              <LinkContainer to='/doctors/profile'>
                <Nav.Link className='btn btn-light my-3'>Mon profile</Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to='/doctors/patients'>
                <Nav.Link className='btn btn-light my-3'>Mes patients</Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to='/doctors/rdvs'>
                <Nav.Link className='btn btn-light my-3'>
                  Mes rendez-vous
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </>
  );
};

export default DoctorSpaceScreen;
