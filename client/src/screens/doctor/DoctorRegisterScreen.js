import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { register } from '../../actions/doctorActions';

const DoctorRegisterScreen = ({ location, history }) => {
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
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const doctorRegister = useSelector(state => state.doctorRegister);
  const { loading, error, doctorInfo } = doctorRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (doctorInfo) {
      history.push(redirect);
    }
  }, [history, doctorInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(
        register(
          titre,
          prenom,
          nom,
          email,
          password,
          specialite,
          addressCabinet,
          ville,
          phoneCabinet,
          phonePersonel
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>Inscription des medecins</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='titre'>
          <Form.Label>Titre</Form.Label>
          <Form.Control
            as='select'
            value={titre}
            onChange={e => setTitre(e.target.value)}
          >
            <option>Vous etes ... </option>
            <option>Dr. </option>
            <option>Pr.</option>
          </Form.Control>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} md='6' controlId='prenom'>
            <Form.Label>Prenom</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter votre prénom'
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
              placeholder='Enter votre nom'
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
            placeholder='Enter votre adresse email'
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

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
        <Form.Group controlId='specialite'>
          <Form.Label>Specialite</Form.Label>
          <Form.Control
            as='select'
            value={specialite}
            onChange={e => {
              setSpecialite(e.target.value);
            }}
          >
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
            <option>'Médecin Ostéopathe</option>
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
            <option>Médecin physique et réadaptation fonctionnelle</option>
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
              placeholder='Exemple: 11, Avenue du 16 Novembre'
              value={addressCabinet}
              onChange={e => {
                setAddressCabinet(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} md='6' controlId='city'>
            <Form.Label>Ville</Form.Label>
            <Form.Control
              placeholder='Choisissez une ville'
              value={ville}
              onChange={e => {
                setVille(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md='6' controlId='phoneCabinet'>
            <Form.Label>Numéro de Téléphone (cabinet)</Form.Label>
            <Form.Control
              placeholder='05.....'
              value={phoneCabinet}
              onChange={e => {
                setPhoneCabinet(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} md='6' controlId='phonePersonel'>
            <Form.Label>Ville</Form.Label>
            <Form.Control
              placeholder='06...'
              value={phonePersonel}
              onChange={e => {
                setPhonePersonel(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Button type='submit' variant='primary'>
          Créer mon compte
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <p>Vous avez un compte ?</p>
          <Link
            to={
              redirect ? `/doctor/login?redirect=${redirect}` : '/doctor/login'
            }
          >
            <p>Connecter vous</p>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default DoctorRegisterScreen;
