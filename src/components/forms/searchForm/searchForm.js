import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup  from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './searchForm.scss';
import { DEFAULT_FILTERS } from '../../../lib/filterUtil';
import { ApiUtil } from '../../../lib/apiUtil';
import { useState, useEffect } from 'react';

const SearchForm = ({ filters, setFilters, setEmployees }) => {
    const [applyFilter, setApplyFilter] = useState({});

    const onFilterChange = (partialFilters) => {
        const updatedFilters = { ...filters, ...partialFilters };
        setFilters(updatedFilters);
    }

    const onFormClear = async (e) => {
        e.preventDefault();
        setFilters(DEFAULT_FILTERS)
        setApplyFilter(DEFAULT_FILTERS)
    }

    useEffect(() => {
        ApiUtil.getAllEmployee(filters).then((data) => {
            setEmployees(data);
          });
    }, [applyFilter]);
    
    const onFilterSubmit = async (e) => {
        e.preventDefault();
        setApplyFilter(filters);
    }


    return (
        <form id="searchFormStyle" onSubmit={(e) => onFilterSubmit(e)}>
            <h3>Search</h3>
            <Row>
                <Col>
                    <Form.Control 
                        type="text" 
                        placeholder="First name"
                        value={filters.firstNameFilter}
                        onChange={(e) => onFilterChange({ firstNameFilter: e.target.value })}
                    />
                </Col>
                <Col>
                    <Form.Control 
                        type="text" 
                        placeholder="Last name"
                        value={filters.lastNameFilter}
                        onChange={(e) => onFilterChange({ lastNameFilter: e.target.value })}
                    />
                </Col>
                <Col>
                    <Form.Select 
                        aria-label="Employee Type"
                        value={filters.employmentTypeFilter}
                        onChange={(e) => onFilterChange({ employmentTypeFilter: Number(e.target.value) })}
                    >
                        <option value="0">Full/Part-Time</option>
                        <option value="1">Full-time</option>
                        <option value="2">Part-time</option>
                    </Form.Select>
                </Col>
            </Row>
            <br/>
            <Row>
            <Col>
                <Form.Control 
                    type="text" 
                    placeholder="Email"
                    value={filters.emailFilter}
                    onChange={(e) => onFilterChange({ emailFilter: e.target.value })}
                />
            </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Form.Control 
                        type="text" 
                        placeholder="Phone Number"
                        value={filters.phoneFilter}
                        onChange={(e) => onFilterChange({ phoneFilter: e.target.value })}
                    />
                </Col>
            </Row>
            <br/>
            <h3>Sick Days</h3>
            <Row>
                <Col>
                    <Form.Control
                        type="number"
                        placeholder="Number of Sick days"
                        min="0"
                        value={filters.sickDaysFilter}
                        onChange={(e) => onFilterChange({ sickDaysFilter: e.target.value })}
                    />
                </Col>
                <Col>
                    <InputGroup>
                        <InputGroup.Text>From</InputGroup.Text>
                        <Form.Control
                            type="date"
                            value={filters.sickDaysFromFilter}
                            onChange={(e) => onFilterChange({ sickDaysFromFilter: e.target.value })}
                        />
                    </InputGroup>
                </Col>
                <Col>
                <InputGroup>
                        <InputGroup.Text>To</InputGroup.Text>
                        <Form.Control
                            type="date"
                            value={filters.sickDaysToFilter}
                            onChange={(e) => onFilterChange({ sickDaysToFilter: e.target.value })}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <br/>
            <Button variant="primary" style={{marginRight: "5px"}} type="submit">Filter</Button>
            <Button variant="danger" type="button" onClick={(e) => onFormClear(e)}>Clear</Button>
        </form>
    );
}

export default SearchForm;