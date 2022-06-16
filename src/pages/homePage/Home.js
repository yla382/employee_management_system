import Table from '../../components/table/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.scss';
import SearchForm from '../../components/forms/searchForm/searchForm';
import { useState } from 'react';
import { DEFAULT_FILTERS } from '../../lib/filterUtil';

const Home = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [employees, setEmployees] = useState([]);

    return (
        <div id="homeContainer">
            <div id="tableContainer">
                <div id="submitButtonStyle">
                    <Button variant="primary" onClick={() => navigate("/add_employee")}>Add Employee</Button>
                </div>
                <SearchForm filters={filters} setFilters={setFilters} setEmployees={setEmployees}/>
                <Table employees={employees}/>
            </div>
        </div>
    );
};

export default Home;