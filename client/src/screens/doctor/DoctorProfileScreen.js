import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Nav, Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  getDoctorDetails,
  updateDoctorProfile,
} from '../../actions/doctorActions';
import axios from 'axios';
import Rating from '../../components/Rating';
import Map from '../../components/Map';
import { DOCTOR_UPDATE_PROFILE_RESET } from '../../constants/doctorConstants';

const DoctorProfileScreen = ({ location, history }) => {
  const [titre, setTitre] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [addressCabinet, setAddressCabinet] = useState('');
  const [ville, setVille] = useState('');
  const [phoneCabinet, setPhoneCabinet] = useState('');
  const [phonePersonel, setPhonePersonel] = useState('');
  const [image, setImage] = useState('');
  const [prixConsultation, setPrixConsultation] = useState('');
  const [description, setDescription] = useState('');
  const [diplomesEtFormations, setDiplomesEtFormations] = useState('');
  const [informationsPratiques, setInformationsPratiques] = useState('');

  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const doctorDetails = useSelector(state => state.doctorDetails);
  const { loading, error, doctor } = doctorDetails;

  const doctorLogin = useSelector(state => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  const doctorUpdateProfile = useSelector(state => state.doctorUpdateProfile);
  const { success } = doctorUpdateProfile;

  useEffect(() => {
    if (!doctorInfo) {
      history.push('/doctors/login');
    } else {
      if (!doctor.nom || !doctor || success) {
        dispatch({ type: DOCTOR_UPDATE_PROFILE_RESET });
        dispatch(getDoctorDetails('profile'));
      } else {
        setTitre(doctor.titre);
        setPrenom(doctor.prenom);
        setNom(doctor.nom);
        setEmail(doctor.email);
        setSpecialite(doctor.specialite);
        setAddressCabinet(doctor.addressCabinet);
        setVille(doctor.ville);
        setPhoneCabinet(doctor.phoneCabinet);
        setPhonePersonel(doctor.phonePersonel);
        setImage(doctor.image);
        setPrixConsultation(doctor.prixConsultation);
        setDiplomesEtFormations(doctor.diplomesEtFormations);
        setDescription(doctor.description);
        setInformationsPratiques(doctor.informationsPratiques);
      }
    }
  }, [dispatch, history, doctorInfo, doctor, success]);

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        '/api/doctors/uploads',
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(
        updateDoctorProfile({
          id: doctor._id,
          titre,
          nom,
          prenom,
          email,
          password,
          specialite,
          addressCabinet,
          ville,
          phoneCabinet,
          phonePersonel,
          image,
          prixConsultation,
          diplomesEtFormations,
          description,
          informationsPratiques,
        })
      );
    }
  };

  return (
    <>
      <Row>
        <Col>
          {doctorInfo && (
            <h3>
              <br />
              Bonjour {doctorInfo.titre} {doctorInfo.nom}{' '}
            </h3>
          )}
          <Nav className='justify-content-center mb-4'>
            <Nav.Item>
              <LinkContainer to='/doctors/profile'>
                <Nav.Link className='btn btn-light my-3'>
                  {' '}
                  <i className='fas fa-user'></i> Mon profile
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to='/doctors/patients'>
                <Nav.Link className='btn btn-light my-3'>
                  <i className='fas fa-user-injured'></i> Mes patients
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to='/doctors/rdvs'>
                <Nav.Link className='btn btn-light my-3'>
                  <i className='fas fa-calendar-alt'> </i>
                  Mes rendez-vous
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            {' '}
            <Col md={3}>
              {' '}
              <Card className='my-3 p-3 rounded'>
                <Card.Img
                  src={doctor.image}
                  variant='top'
                  className='image-profile'
                />
                <Form.Group controlId='image'>
                  <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>
                <Card.Body>
                  <Card.Title as='div' className='text-center'>
                    <strong>
                      {doctor.titre} {doctor.prenom} {doctor.nom}
                    </strong>
                  </Card.Title>
                  <Card.Text as='div'>
                    <Rating value={doctor.rating} text={`$ Reviews`} />
                  </Card.Text>
                  <Card.Text as='h3'>{doctor.phone}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={9}>
              <h4>INFORMATIONS GENERALES ET COORDONNEES</h4>
              {error && <Message variant='danger'>{error}</Message>}
              {message && <Message variant='danger'>{message}</Message>}
              {success && <Message variant='success'>Profile Updated</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='titre'>
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    as='select'
                    value={titre}
                    onChange={e => setTitre(e.target.value)}
                  >
                    <option>Dr. </option>
                    <option>Pr.</option>
                  </Form.Control>
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} md='6' controlId='prenom'>
                    <Form.Label>Prenom</Form.Label>
                    <Form.Control
                      type='name'
                      value={prenom}
                      onChange={e => {
                        setPrenom(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} md='6' controlId='nom'>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type='name'
                      value={nom}
                      onChange={e => {
                        setNom(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId='email'>
                  <Form.Label>Adresse Email</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>

                <hr />
                <Form.Group controlId='specialite'>
                  <Form.Label>Specialite</Form.Label>
                  <Form.Control
                    as='select'
                    value={specialite}
                    onChange={e => {
                      setSpecialite(e.target.value);
                    }}
                  >
                    <option>Choisissez votre specialité</option>
                    <option>Orthodontiste</option>
                    <option>Psychiatre</option>
                    <option>Cardiologue</option>
                    <option>Chirurgien digestif - viscéral</option>
                    <option>Opticien</option>
                    <option>Gastrologue</option>
                    <option>entérologue</option>
                    <option>Chirurgien général</option>
                    <option>Chirurgien dentiste</option>
                    <option>Kinésithérapeute</option>
                    <option>Urologue et chirurgien urologue</option>
                    <option>Oto-rhino-laryngologue</option>
                    <option>Endocrinologue - maladies métaboliques</option>
                    <option>Ophtalmologue</option>
                    <option>Médecin Ostéopathe</option>
                    <option>Gériatre</option>
                    <option>Chirurgien esthétique</option>
                    <option>Dermatologue</option>
                    <option>Pédiatre</option>
                    <option>Gynécologue obstétricien</option>
                    <option>Anatomo-pathologiste</option>
                    <option>Rhumatologue</option>
                    <option>Orthophoniste</option>
                    <option>Médecin généraliste</option>
                    <option>Psychologue</option>
                    <option>Nutritionniste</option>
                    <option>Médecin interne</option>
                    <option>Infirmier</option>
                    <option>Chirurgien cardio-vasculaire</option>
                    <option>Pneumologue</option>
                    <option>Neurochirurgien</option>
                    <option>Chirurgien orthopédiste et traumatologue</option>
                    <option>Neuropsychiatre</option>
                    <option>Génétique médicale</option>
                    <option>Sexologue</option>
                    <option>Neurologue</option>
                    <option>Médecin biologiste</option>
                    <option>Stomatologue et chirurgien maxillo-faciale</option>
                    <option>Gynécologue sexologue</option>
                    <option>Cancérologue</option>
                    <option>Algologue</option>
                    <option>Chirurgien réparateur et plastique</option>
                    <option>Allergologue</option>
                    <option>Médecin sportif</option>
                    <option>Néphrologue</option>
                    <option>Chirurgien pédiatre</option>
                    <option>
                      Médecin physique et réadaptation fonctionnelle
                    </option>
                    <option>Gérontologue</option>
                    <option>Podologue</option>
                    <option>Chirurgien hépato-biliaire et digestive</option>
                    <option>Oncologue médicale</option>
                    <option>Médecin légal et de travail</option>
                    <option>Pédodontiste</option>
                    <option>Acupuncteur</option>
                    <option>Radiothérapeute</option>
                    <option>Angiologue</option>
                    <option>Médecin morphologique et anti-âge</option>
                    <option>Diététicien</option>
                    <option>Radiologue</option>
                    <option>Psychomotricité</option>
                    <option>Chirurgien cancérologue</option>
                    <option>Anesthésiste-réanimateur</option>
                    <option>Médecine nucléaire</option>
                    <option>Homéopathe</option>
                    <option>Orthopédiste dento-faciale</option>
                    <option>Pharmacologue</option>
                    <option>Parodontologue</option>
                    <option>infectiologue</option>
                    <option>Odontologue chirurgicale</option>
                    <option>Chirurgien thoracique</option>
                    <option>Biologiste vétérinaire</option>
                    <option>Réanimateur</option>
                    <option>Médecin urgentiste</option>
                    <option>Autre</option>
                  </Form.Control>
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} md='6' controlId='AddressCabinet'>
                    <Form.Label>Numero et rue du cabinet</Form.Label>
                    <Form.Control
                      value={addressCabinet}
                      onChange={e => {
                        setAddressCabinet(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} md='6' controlId='city'>
                    <Form.Label>Ville</Form.Label>
                    <Form.Control
                      value={ville}
                      onChange={e => {
                        setVille(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Col as='div' className='map-doctor-profile'>
                    <Map doctor={doctor} />
                  </Col>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md='6' controlId='phoneCabinet'>
                    <Form.Label>Numéro de Téléphone (cabinet)</Form.Label>
                    <Form.Control
                      value={phoneCabinet}
                      onChange={e => {
                        setPhoneCabinet(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} md='6' controlId='phonePersonel'>
                    <Form.Label>Phone personnel</Form.Label>
                    <Form.Control
                      value={phonePersonel}
                      onChange={e => {
                        setPhonePersonel(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md='12' controlId='prixConsultation'>
                    <Form.Label>Prix de la consultation</Form.Label>
                    <Form.Control
                      value={prixConsultation}
                      onChange={e => {
                        setPrixConsultation(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} md='12' controlId='diplomesEtFormations'>
                    <Form.Label>Diplomes et formations</Form.Label>
                    <Form.Control
                      value={diplomesEtFormations}
                      onChange={e => {
                        setDiplomesEtFormations(e.target.value);
                      }}
                    ></Form.Control>

                    <Form.Group as={Col} md='12' controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md='12'
                      controlId='informationsPratiques'
                    >
                      <Form.Label>Informations pratiques</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        value={informationsPratiques}
                        onChange={e => setInformationsPratiques(e.target.value)}
                      />
                    </Form.Group>
                  </Form.Group>
                </Form.Row>

                <hr />

                <h4>CONFIDENTIALITE</h4>
                <Form.Row>
                  <Form.Group as={Col} md='6' controlId='password'>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter votre mot de passe'
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} md='6' controlId='confirmPassword'>
                    <Form.Label>Confirmer mot de passe</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Confirmer votre mot de passe'
                      value={confirmPassword}
                      onChange={e => {
                        setConfirmPassword(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>

                <hr />
                <Button type='submit' variant='primary'>
                  Enregister les modifications
                </Button>
              </Form>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default DoctorProfileScreen;
