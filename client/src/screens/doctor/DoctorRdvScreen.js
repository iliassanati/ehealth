import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Nav, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { doctorMyrdvs } from '../../actions/rdvActions';
import moment from 'moment';

const DoctorRdvScreen = ({ history }) => {
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
      <Row>
        <Col md={12}>
          <h2>Mes rendez-vous</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rdvs.map(rdv => (
                  <tr key={rdv._id}>
                    <td>{rdv._id}</td>
                    <td>
                      {moment(rdv.createdAt).format('MMMM Do YYYY, h:mm ')}
                    </td>
                    <td>{rdv.totalPrice}</td>
                    <td>
                      {rdv.isPaid ? (
                        moment(rdv.paidAt).format('MMMM Do YYYY, h:mm a')
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {rdv.isDelivered ? (
                        moment(rdv.deliveredAt).format('MMMM Do YYYY, h:mm a')
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/rdv/${rdv._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
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

export default DoctorRdvScreen;
