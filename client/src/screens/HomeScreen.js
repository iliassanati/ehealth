import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import { Col, Row } from 'react-bootstrap';
import { RDV_DETAILS_RESET } from '../constants/rdvConstants';
import { listDoctors } from '../actions/doctorActions';
import About from '../components/About';
import Service from '../components/Service';

const HomeScreen = ({ match }) => {
  const keyword1 = match.params.keyword1;
  const keyword2 = match.params.keyword2;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: RDV_DETAILS_RESET });
    dispatch(listDoctors(keyword1, keyword2));
  }, [dispatch, keyword1, keyword2]);
  return (
    <>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>
              <i className='fas fa-user-md'></i> Trouvez un médecin
            </h1>
            <p className='lead'>
              Près de chez vous et prenez rendez-vous en ligne{' '}
              <i className='far fa-calendar-check'></i>
            </p>
            <Row>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Row>
          </div>
        </div>
      </section>
      <About />
      <Service />
    </>
  );
};

export default HomeScreen;
