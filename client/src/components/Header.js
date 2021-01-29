import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import { doctorLogout } from '../actions/doctorActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const doctorLogin = useSelector(state => state.doctorLogin);

  const { userInfo } = userLogin;
  const { doctorInfo } = doctorLogin;

  const patientLogoutHandler = e => {
    e.preventDefault();
    dispatch(logout());
  };

  const doctorLogoutHandler = e => {
    e.preventDefault();
    dispatch(doctorLogout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <i className='fal fa-heart-rate'></i> E-Health
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo ? (
                <>
                  <LinkContainer to='/patient/profile'>
                    <Nav.Link>
                      <i className='fas fa-calendar-alt'> </i> Mes rendez-vous
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title={userInfo.prenom} id='username'>
                    <LinkContainer to='/patient/profile'>
                      <NavDropdown.Item>
                        {' '}
                        <i className='fas fa-user'></i> Profile
                      </NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={patientLogoutHandler}>
                      <i className='fas fa-sign-out-alt'></i> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : doctorInfo ? (
                <>
                  <LinkContainer to='/doctors/doctorspace'>
                    <Nav.Link>
                      <i className='fas fa-user-md'></i> Bonjour{' '}
                      {doctorInfo.prenom}
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/'>
                    <Nav.Link onClick={doctorLogoutHandler}>
                      <i className='fas fa-sign-out-alt'></i> Deconnecter
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to='/doctors/login'>
                    <Nav.Link>
                      <i className='fas fa-user-md'></i> Vous etes un medecin?
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/patient/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Mon Compte
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
