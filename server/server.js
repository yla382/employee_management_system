const express = require('express');
const cors = require('cors');
const employee = require('./model/employee.js');

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.get('/employees', async (req, res) => {
    const recordSet = await employee.getAllEmployees();
    res.send(recordSet.recordset);
});

app.listen(port, () => {
    console.log(`API server listening`);
});