import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import DoctorCard from '../components/DoctorCard';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listDoctors } from '../actions/doctorActions';
import SearchBox from '../components/SearchBox';
import { RDV_DETAILS_RESET } from '../constants/rdvConstants';

const SearchScreen = ({ match }) => {
  const keyword1 = match.params.keyword1;
  const keyword2 = match.params.keyword2;

  const dispatch = useDispatch();
  const doctorList = useSelector(state => state.doctorList);
  const { doctors, error, loading } = doctorList;

  useEffect(() => {
    dispatch({ type: RDV_DETAILS_RESET });
    dispatch(listDoctors(keyword1, keyword2));
  }, [dispatch, keyword1, keyword2]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row
            style={{
              paddingTop: '40px',
              paddingLeft: '200px',
              paddingBottom: '30px',
            }}
          >
            <Route render={({ history }) => <SearchBox history={history} />} />
          </Row>
          <Row>
            {doctors.length > 0 ? (
              doctors.map(doctor => (
                <Col key={doctor._id} sm={12} md={6} lg={4} xl={3}>
                  <DoctorCard doctor={doctor}></DoctorCard>
                </Col>
              ))
            ) : (
              <Message variant='danger'>Aucun medecin n'est trouve</Message>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default SearchScreen;
