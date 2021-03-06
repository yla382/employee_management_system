import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiUtil } from '../../lib/apiUtil';
import { useNavigate } from "react-router-dom"

const AddEmployeeForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeType, setEmployeeType] = useState('1');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const onInputChange = (event, setState) => {
        setState(event.target.value.trim());
    }

    const navigate = useNavigate();
    const onFormSubmit = async (e) => {
        e.preventDefault();
        //console.log("hi");
        ApiUtil.addEmployee(employeeType, firstName, lastName, email, phoneNumber).then((response) => {
            if(response.status === 200) {
                alert("Employee successfully added");
                navigate("/");
            } else {
                alert(response.data.msg);
            }
        });
        //send then alert
    }

    const onFormClear = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
    }

    return (
        <form onSubmit={e => onFormSubmit(e)}>
            <Row>
                <Col>
                    <Form.Control 
                        type="text" 
                        onChange={e => onInputChange(e, setFirstName)} 
                        value={firstName} 
                        placeholder="First name"
                    />
                </Col>
                <Col>
                    <Form.Control 
                        type="text"
                         onChange={e => onInputChange(e, setLastName)}
                         value={lastName}
                         placeholder="Last name"
                    />
                </Col>
                <Col>
                    <Form.Select aria-label="Employee Type"
                        value={employeeType}
                        onChange={e => onInputChange(e, setEmployeeType)} 
                    >
                        <option value="1">Full-time</option>
                        <option value="2">Part-time</option>
                    </Form.Select>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Form.Control 
                        type="email" 
                        onChange={e => onInputChange(e, setEmail)} 
                        value={email}
                        placeholder="Email"
                    />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Form.Control 
                        type="tel" 
                        onChange={e => onInputChange(e, setPhoneNumber)} 
                        value={phoneNumber}
                        placeholder="Phone Number"
                    />
                </Col>
            </Row>
            <br/>
            <Button variant="primary" style={{marginRight: "5px"}} type="submit">Add Employee</Button>
            <Button variant="danger" type="button" onClick={() => onFormClear()}>Clear</Button>
        </form>
    );
};

export default AddEmployeeForm;