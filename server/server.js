const express = require('express');
const cors = require('cors');
const Employee = require('./model/employee.js');
const SickDay = require('./model/sickDay.js');
const validationUtil = require('./utils/validationUtil.js');

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());


app.get('/sickdays/:id', async (req, res) => {
    const id = req.params.id;
    const recordSet = await SickDay.getSickDatesByEmployeeId(id);
    return res.send(recordSet.recordset);
});

app.post('/sickdays/add', async (req, res) => {
    const employeeId = req.body.EMPLOYEE_ID;
    const sickDayFrom = req.body.sickDayFrom;
    const sickDayTo = req.body.sickDayTo;

    const insertResult = await SickDay.addNewSickDatesById(employeeId, sickDayFrom, sickDayTo);
    if(insertResult) {
        return res.status(200).send();
    } else {
        return res.status(500).send();
    }
});

app.get('/employees_test', async (req, res) => {
    const recordSet = await Employee.getAllEmployees({}, {sickFrom:'', sickTo:''});
    return res.send(recordSet.recordset);
});

app.get('/employees', async (req, res) => {
    const urlQuery = req.query;
    const dateSickRange = {sickFrom: urlQuery.sick_from, sickTo: urlQuery.sick_to}
    delete urlQuery.sick_from;
    delete urlQuery.sick_to;
    const recordSet = await Employee.getAllEmployees(urlQuery, dateSickRange);
    return res.send(recordSet.recordset);
});

app.get('/employees/:id', async (req, res) => {
    const id = req.params.id;
    const recordSet = await Employee.findEmployeeByID(id);
    return res.send(recordSet.recordset[0]);
});

app.get('/employees/:id/delete', async (req, res) => {
    const id = req.params.id;
    const result = await Employee.disableEmployee(id);

    if(result) {
        return res.status(200).send();
    } else {
        return res.status(500).send({msg: "Error: Unable to delete"});
    }
});

app.post('/employees/update', async (req, res) => {
    const validationResult = validationUtil.validateInput(req.body.employee_info);
    if(!validationResult.validation) return res.status(400).send({msg: validationResult.msg});

    const insertResult = await Employee.updateEmployee(req.body.ID, req.body.employee_info);
    if(insertResult) {
        return res.status(200).send();
    } else {
        return res.status(500).send();
    }
});

app.post('/employees/add', async (req, res) => {
    const newEmployee = new Employee(req.body);
    const validationResult = validationUtil.validateInput(req.body);
    if(!validationResult.validation) return res.status(400).send({msg: validationResult.msg});
    const insertResult = await Employee.addEmployee(newEmployee);
    if(insertResult) {
        return res.status(200).send();
    } else {
        return res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`API server listening`);
});