import AddEmployeeForm from '../../components/forms/AddEmployeeForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './addEmployee.scss';

const AddEmployee = () => {

    return (
        <div id="addEmployeeContainer">
            <div id="addEmployeeForm">
                <h2>Add Employee</h2>
                <AddEmployeeForm/>
            </div>
        </div>
    );
};

export default AddEmployee;