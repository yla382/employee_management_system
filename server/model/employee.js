const sqlRequest = require('./dataConnection.js');
const sqlUtils = require('../utils/sqlUtils.js');

const Employee = function(employee) {
    this.EMPLOYEE_TYPE_ID = employee.EMPLOYEE_TYPE_ID;
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email_address = employee.email_address;
    this.phone_number = employee.phone_number;
}

Employee.values = (employee) => {
    return `${employee.EMPLOYEE_TYPE_ID}, '${employee.first_name}', '${employee.last_name}', '${employee.email_address}', '${employee.phone_number}'`;
}

Employee.getAllEmployees = async (urlQuery, dateSickRange) => {
    var whereClause = `active='Y'`;
    const querySize = Object.keys(urlQuery).length;
    if(querySize > 0) {
        let i = 0
        whereClause += ' and '
        for(const [key, val] of Object.entries(urlQuery)) {
            if(key === 'sick_count') {
                whereClause += `ISNULL(${key}, 0) >= ${val}`;
            } else if(key === 'EMPLOYEE_TYPE_ID') {
                if(val === '0') { 
                    whereClause += `${key} > ${val}`;
                } else {
                    whereClause += `${key} = ${val}`;
                }
            } else {
                whereClause += `${key} LIKE '${val}%'`;
            }
            if(i !== querySize - 1) whereClause += ` AND `;
            i++;
        }
    }
    
    const recordSet = await sqlRequest(`${sqlUtils.getEmployeeTable(dateSickRange.sickFrom, dateSickRange.sickTo)} WHERE ${whereClause}`);
    return recordSet;
}

Employee.findEmployeeByID = async (id) => {
    const recordSet = await sqlRequest(`SELECT * FROM Employee WHERE ID='${id}'`);
    return recordSet;
}

Employee.addEmployee = async (employee) => {
    const query = `INSERT INTO Employee (EMPLOYEE_TYPE_ID, first_name, last_name, email_address, phone_number) VALUES (` + Employee.values(employee) + `)`;
    const recordSet = await sqlRequest(query);
    
    if(recordSet.rowsAffected > 0) {
        return true;
    } else {
        return false;
    }
}

Employee.disableEmployee = async (id) => {
    const query = `UPDATE Employee SET active='N' WHERE ID='${id}'`;
    const recordSet = await sqlRequest(query);
    
    if(recordSet.rowsAffected > 0) {
        return true;
    } else {
        return false;
    }
}

Employee.updateEmployee = async (id, employee_info) => {
    const infoSize = Object.keys(employee_info).length;
    let query = 'UPDATE Employee SET ';
    let i = 0
    for(const [key, val] of Object.entries(employee_info)) {
        query += `${key}='${val}'`;

        if(i !== infoSize - 1) {
            query += ', ';
        } else {
            query += ' ';
        }
        i++;
    }
    query += ` WHERE ID=${id}`;

    const recordSet = await sqlRequest(query);
    if(recordSet.rowsAffected > 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = Employee;