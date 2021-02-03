import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Nav, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { doctorMyrdvs } from '../../actions/rdvActions.js';
import moment from 'moment';

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

  console.log(rdvs);

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

      <Row>
        <Col md={12}>
          <h2>Mes patiens</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOM</th>
                  <th>PRENOM</th>
                  <th>TELEPHONES</th>
                  <th>DATE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rdvs.map(rdv => (
                  <tr key={rdv._id}>
                    <td>{rdv.userId}</td>
                    <td>{rdv.userNom}</td>
                    <td>{rdv.userPrenom}</td>
                    <td>{rdv.userPhone}</td>
                    <td>
                      {moment(rdv.rdvDate).format('MMMM Do YYYY, h:mm a')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default DoctorPatientsScreen;
