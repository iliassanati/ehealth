import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

//Patient Screen
import PatientLoginScreen from './screens/patient/PatientLoginScreen';
import PatientRegisterScreen from './screens/patient/PatientRegisterScreen';
import PatientProfileScreen from './screens/patient/PatientProfileScreen';

// Admin

import Admin from './admin/pages/Admin'

//Doctor Screen
import DoctorLoginScreen from './screens/doctor/DoctorLoginScreen';
import DoctorRegisterScreen from './screens/doctor/DoctorRegisterScreen';
import DoctorProfileScreen from './screens/doctor/DoctorProfileScreen';
import DoctorPatientsScreen from './screens/doctor/DoctorPatientsScreen';
import HomeScreen from './screens/HomeScreen';
import DoctorInfoScreen from './screens/DoctorInfoScreen';
import RdvScreen from './screens/RdvScreen';
import PayementScreen from './screens/PayementScreen';
import PlaceOrder from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import PatientRdvScreen from './screens/patient/PatientRdvScreen';
import DoctorRdvScreen from './screens/doctor/DoctorRdvScreen';

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/search/:keyword1&:keyword2' component={HomeScreen} />
            <Route path='/doctor/:id' component={DoctorInfoScreen} exact />
            <Route path='/doctor/:id/rdvinfo' component={RdvScreen} exact />
            <Route
              path='/doctor/:id/payment'
              component={PayementScreen}
              exact
            />
            <Route path='/doctor/:id/placeorder' component={PlaceOrder} exact />
            <Route path='/rdv/:id' component={OrderScreen} />

            <Route path='/admin' component={Admin} />

            <Route path='/patient/login' component={PatientLoginScreen} />
            <Route path='/patient/register' component={PatientRegisterScreen} />
            <Route path='/patient/profile' component={PatientProfileScreen} />
            <Route path='/patient/rdvs' component={PatientRdvScreen} />

            <Route path='/doctors/login' component={DoctorLoginScreen} />
            <Route path='/doctors/register' component={DoctorRegisterScreen} />
            <Route path='/doctors/profile' component={DoctorProfileScreen} />
            <Route path='/doctors/patients' component={DoctorPatientsScreen} />
            <Route path='/doctors/rdvs' component={DoctorRdvScreen} />
          </Container>
        </main>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;