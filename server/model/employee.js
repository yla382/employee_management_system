const sqlRequest = require('./dataConnection.js');

const Employee = function(employee) {
    this.ID = employee.ID;
    this.EMPLOYEE_ID = employee.EMPLOYEE_ID;
    this.sick_date = employee.sick_date;
    this.active = employee.active;
}

Employee.getAllEmployees = async () => {
    const recordSet = await sqlRequest(`SELECT * FROM Employee WHERE active='Y'`);
    return recordSet;
}

module.exports = Employee;