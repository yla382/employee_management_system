const sqlRequest = require('./dataConnection.js');
const sqlUtils = require('../utils/sqlUtils.js');

const SickDay = function(sickDay) {
    this.ID = sickDay.ID;
    this.EMPLOYEE_ID = sickDay.EMPLOYEE_ID;
    this.sick_date = sickDay.sick_date;
    this.active = sickDay.active;
}

SickDay.getSickDatesByEmployeeId = async (id) => {
    const recordSet = await sqlRequest(`SELECT * FROM Employee_Sickday WHERE EMPLOYEE_ID ='${id}'`);
    return recordSet;
}

SickDay.addNewSickDatesById = async (exmployeeId, sickDayFrom, sickDayTo) => {
    const recordSet = await sqlRequest(sqlUtils.insertNewSickDates(exmployeeId, sickDayFrom, sickDayTo));
    if(recordSet.rowsAffected > 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = SickDay;