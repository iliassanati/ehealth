import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

//Patient Screen
import PatientLoginScreen from './screens/patient/PatientLoginScreen';
import PatientRegisterScreen from './screens/patient/PatientRegisterScreen';
import PatientProfileScreen from './screens/patient/PatientProfileScreen';

//Doctor Screen
import DoctorLoginScreen from './screens/doctor/DoctorLoginScreen';
import DoctorRegisterScreen from './screens/doctor/DoctorRegisterScreen';
import DoctorSpaceScreen from './screens/doctor/DoctorSpaceScreen';
import DoctorProfilScreen from './screens/doctor/DoctorProfilScreen';

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/patient/login' component={PatientLoginScreen} />
            <Route path='/patient/register' component={PatientRegisterScreen} />
            <Route path='/patient/profile' component={PatientProfileScreen} />

            <Route path='/doctor/login' component={DoctorLoginScreen} />
            <Route path='/doctor/register' component={DoctorRegisterScreen} />
            <Route path='/doctor/doctorspace' component={DoctorSpaceScreen} />
            <Route path='/doctor/doctorprofil' component={DoctorProfilScreen} />
          </Container>
        </main>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
