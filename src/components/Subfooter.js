import React from 'react';
// import Copywright from './Copywright';
// import Guides from './Guides';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Subfooter = (props) => {
    return (
        // <div className="subfooter">
        //     <div><Copywright /></div>
        //     <div><Guides /></div>
        // </div>
        <Container fluid="true">
            <Row className="subfooters">
                <Col sm={12} md={6} lg={6}><Copywright className="copywright" /></Col>
                <Col sm={12} md={6} lg={6}><Guides className="guides" /></Col>
            </Row>
        </Container>
    )
}

export default Subfooter;
window.Subfooter = Subfooter;