import Table from '../../components/table/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.scss';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div id="homeContainer">
            <div id="tableContainer">
                <div id="submitButtonStyle">
                    <Button variant="primary" onClick={() => navigate("/add_employee")}>Add Employee</Button>
                </div>
                <Table/>
            </div>
        </div>
    );
};

export default Home;