import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddEmployeeForm = () => {
    return (
        <form>
            <Row>
                <Col>
                    <Form.Control type="text" placeholder="First name"/>
                </Col>
                <Col>
                    <Form.Control type="text" placeholder="Last name"/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Form.Control type="email" placeholder="Email"/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Form.Control type="tel" placeholder="Phone Number"/>
                </Col>
            </Row>
            <br/>
            <Button variant="primary" style={{marginRight: "5px"}}>Add Employee</Button>
            <Button variant="danger">Clear</Button>
        </form>
    );
};

export default AddEmployeeForm;