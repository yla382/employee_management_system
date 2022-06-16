import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';
import { ApiUtil } from '../../lib/apiUtil';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup  from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './employee.scss';
import { useNavigate } from "react-router-dom"
import '../../components/table/table.scss';

const Employee = () => {
    const {state} = useLocation();
    const { id } = state;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeType, setEmployeeType] = useState('1');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sickDays, setSickDays] = useState([]);

    const [newSickDaysFrom, setNewSickDaysFrom] = useState('');
    const [newSickDaysTo, setNewSickDaysTo] = useState('');
   
    const navigate = useNavigate();

    useEffect(() => {
        ApiUtil.findEmployee(id).then((data) => {
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setEmployeeType(String(data.EMPLOYEE_TYPE_ID));
            setEmail(data.email_address);
            setPhoneNumber(data.phone_number);
          });
    }, []);

    useEffect(() => {
        ApiUtil.getSickDayByEmployee(id).then((data) => {
            setSickDays(data);
          });
    }, []);

    const onInputChange = (event, setState) => {
        setState(event.target.value.trim());
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        ApiUtil.updateEmployee(id, employeeType, firstName, lastName, email, phoneNumber).then((response) => {
            if(response.status === 200) {
                alert("Employee successfully updated");
                navigate("/");
            } else {
                alert(response.data.msg);
            }
        });
    }

    const onFormDelete = async () => {
        ApiUtil.deleteEmployee(id).then((response) => {
            if(response.status === 200) {
                console.log('deleted')
                alert("Employee successfully deleted");
                navigate("/");
            } else {
                alert(response.data.msg);
            }
        });
    }

    const addSickDaysCancel = () => {
        setNewSickDaysFrom('');
        setNewSickDaysTo('');
    }

    const onSickDayAdd = async (e) => {
        e.preventDefault();

        ApiUtil.addNewSickDays(id, newSickDaysFrom, newSickDaysTo).then((response) => {
            if(response.status === 200) {
                alert("New sick days added (get better soon :)");
                
                ApiUtil.getSickDayByEmployee(id).then((data) => {
                    setSickDays(data);
                });
                
                setNewSickDaysFrom('');
                setNewSickDaysTo('');
            } else {
                alert(response.data.msg);
            }
        });
    }

    return (
        <div id='employeeContainer'>
            <div id='editEmployeeForm'>
                <form onSubmit={e => onFormSubmit(e)}>
                    <h2> Employee ID: {id}</h2>
                    <Row>
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="First name"
                                value={firstName}
                                onChange={e => onInputChange(e, setFirstName)}
                            />
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={e => onInputChange(e, setLastName)}
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
                                placeholder="Email"
                                value={email}
                                onChange={e => onInputChange(e, setEmail)} 
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Control 
                                type="tel" 
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={e => onInputChange(e, setPhoneNumber)} 
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Button variant="primary" style={{marginRight: "5px"}} type="submit">Update</Button>
                    <Button variant="danger" type="button" onClick={() => onFormDelete()}>Delete</Button>
                </form>
                <form onSubmit={(e) => onSickDayAdd(e)}>
                    <h2>Add Sick days</h2>
                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroup.Text>From</InputGroup.Text>
                                <Form.Control
                                    type="date"
                                    value={newSickDaysFrom}
                                    onChange={e => onInputChange(e, setNewSickDaysFrom)} 
                                />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup>
                                <InputGroup.Text>From</InputGroup.Text>
                                <Form.Control
                                    type="date"
                                    value={newSickDaysTo}
                                    onChange={e => onInputChange(e, setNewSickDaysTo)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Button variant="primary" style={{marginRight: "5px"}} type="submit">Update</Button>
                    <Button variant="danger" type="button" onClick={() => addSickDaysCancel()}>Clear</Button>
                </form>
                <table className='tableStyle'>
                    <thead>
                        <tr>
                            <th>Sick Day ID</th>
                            <th>Sick Date</th>
                        </tr>
                    </thead>
                    <tbody>
                       {sickDays.map((sickDay) => {
                            return (
                                <tr key={sickDay.ID}>
                                    <td>{sickDay.ID}</td>
                                    <td>{sickDay.sick_date.split('T')[0]}</td>
                                </tr>
                            );
                       })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employee;