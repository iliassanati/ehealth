import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <div className='about'></div>
          </Col>
          <Col md={6} style={{ marginTop: '50px' }}>
            <Row>
              <h2 style={{ paddingLeft: '25px' }}>A propos</h2>
              <p style={{ paddingLeft: '50px' }}>
                MyDoctor est un outil innovant qui vous permet de trouver
                rapidement un médecin en ligne et de prendre RDV en temps réel.
                Retrouvez les praticiens de votre ville et prenez rendez-vous
                gratuitement et en un seul clic. Sur MyDoctor, repérez un
                médecin à proximité de chez vous, trouvez toutes les
                informations utiles : spécialités, informations d’accès, tarifs
                de consultation, choisissez le créneau qui vous convient et
                prenez RDV en ligne gratuitement et immédiatement. Dentistes,
                généralistes, ophtalmologues… : Plus besoin d’appels et
                d’attente. Votre prise de RDV est à présent simple, rapide et
                efficace.
              </p>
              <h3 style={{ paddingLeft: '25px' }}>Pourquoi nous choisir?</h3>
              <Row className='list-style'>
                <Col md={6}>
                  <ul style={{ fontSize: '12px' }}>
                    <i class='fa fa-check'></i> <span></span>
                    Tous nos médecins sont formés et expérimentés. Nous et nos
                    partenaires intervenons selon notre charte de
                    confidentialité et notre code de déontologie que nous
                    signerons avec vous.
                  </ul>
                </Col>
                <Col md={6}>
                  <ul style={{ fontSize: '12px' }}>
                    <i class='fa fa-check'></i> <span></span>
                    Nous cherchons en permanence de nouvelles compétences et de
                    nouveaux experts afin de toujours mieux adapter nos
                    interventions en entreprise.
                  </ul>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
