import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Nav, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { patientMyrdvs } from '../../actions/rdvActions';

const PatientRdvScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const patientRdvList = useSelector(state => state.patientRdvList);
  const { error, loading, rdvs } = patientRdvList;

  useEffect(() => {
    if (!userInfo.nom) {
      history.push('/patient/login');
    } else {
      dispatch(patientMyrdvs());
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row>
        <Col>
          {/* {userInfo && <h1>Bonjour {userInfo.prenom} </h1>} */}
          <Nav className='justify-content-center mb-4'>
            <Nav.Item>
              <LinkContainer to='/patient/profile'>
                <Nav.Link className='btn btn-light my-3'>Mon profile</Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to='/patient/rdvs'>
                <Nav.Link className='btn btn-light my-3'>Mes rdvs</Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to='/patient/agenda'>
                <Nav.Link className='btn btn-light my-3'>Mon agenda</Nav.Link>
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
                    <td>{rdv.createdAt.substring(0, 10)}</td>
                    <td>{rdv.totalPrice}</td>
                    <td>
                      {rdv.isPaid ? (
                        rdv.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {rdv.isDelivered ? (
                        rdv.deliveredAt.substring(0, 10)
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

export default PatientRdvScreen;
