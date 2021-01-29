import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Nav, Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { doctorPatientDetails } from '../../actions/userActions.js';
import { doctorMyrdvs } from '../../actions/rdvActions.js';

const DoctorPatientsScreen = ({ history }) => {
  const dispatch = useDispatch();
  const doctorLogin = useSelector(state => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  const doctorRdvList = useSelector(state => state.doctorRdvList);
  const { error, loading, rdvs } = doctorRdvList;

  useEffect(() => {
    if (!doctorInfo) {
      history.push('/doctor/login');
    } else {
      dispatch(doctorMyrdvs());
    }
  }, [dispatch, history, doctorInfo]);

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

export default DoctorPatientsScreen;
