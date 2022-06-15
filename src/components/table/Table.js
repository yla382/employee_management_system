import { useEffect, useState } from 'react';
import { ApiUtil } from '../../lib/apiUtil';
import './table.scss';

const Table = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        ApiUtil.getAllEmployee().then((data) => {
            setEmployees(data);
          });
    }, []);

    return (
        <table className='tableStyle'>
            <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
            </tr>
            {employees.map((employee) => {
                return (
                    <tr>
                        <td>{ employee.EMPLOYEE_TYPE_ID }</td>
                        <td>{ employee.first_name }</td>
                        <td>{ employee.last_name }</td>
                        <td>{ employee.email_address }</td>
                        <td>{ employee.phone_number }</td>
                    </tr>
                );
            })}
        </table>
    );
};

export default Table;