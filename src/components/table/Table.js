import './table.scss';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Table = ({employees}) => {
    const navigate = useNavigate();

    const formatPhoneNumber = (phoneNumber) => {
        let formattedPhoneNumber = phoneNumber;
        formattedPhoneNumber = [formattedPhoneNumber.slice(0, 6), '-', formattedPhoneNumber.slice(6)].join('');
        formattedPhoneNumber = [formattedPhoneNumber.slice(0, 3), ') ', formattedPhoneNumber.slice(3)].join('');
        formattedPhoneNumber = '(' + formattedPhoneNumber;
        return formattedPhoneNumber;
    }
    return (
        <table className='tableStyle'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employment Type</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Sick Days</th>
                    <th>View/Edit</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => {
                    return (
                        <tr key={employee.ID}>
                            <td>{ employee.ID }</td>
                            <td>{employee.EMPLOYEE_TYPE_ID === 1 ? 'Full-Time':'Part-Time'}</td>
                            <td>{ employee.first_name }</td>
                            <td>{ employee.last_name }</td>
                            <td>{ employee.email_address }</td>
                            <td>{ formatPhoneNumber(employee.phone_number) }</td>
                            <td>{ employee.sick_count } </td>
                            <td>
                                <Button variant="primary" onClick={() => navigate("/employee_info", {state: {id: employee.ID}})}>View/Edit</Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;