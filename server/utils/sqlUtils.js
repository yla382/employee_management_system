module.exports = {
    insertNewSickDates: function (employeeId, sickDayFrom, sickDayTo) {
        let query = 'INSERT INTO Employee_Sickday(EMPLOYEE_ID, sick_date, active) VALUES ';
        const values = []
        const untilDate = new Date(sickDayTo);
        for (let date = new Date(sickDayFrom); date <= untilDate; date.setDate(date.getDate() + 1)) {
            values.push(`(${employeeId}, '${date.toISOString().split('T')[0]}', 'Y')`);
        }

        query += values.join(', ');
        return query;
    },

    getEmployeeTable: function (fromDate, toDate) {
        const whereClause = [];
        if(fromDate === '' && toDate === '') {
            whereClause.push('YEAR([sick_date]) = YEAR(GETDATE())');
        } else {
            if(fromDate !== '') {
                whereClause.push(`[sick_date] >= CAST('${fromDate}' AS DATE)`)
            }

            if(toDate !== '') {
                whereClause.push(`[sick_date] <= CAST('${toDate}' AS DATE)`)
            }
        }

        let whereClauseString = `WHERE ${whereClause.join(' AND ')}`;

        const sqlQuery = `
         SELECT [ID]
        ,[EMPLOYEE_TYPE_ID]
        ,[first_name]
        ,[last_name]
        ,[email_address]
        ,[phone_number]
        ,[active]
        ,ISNULL(sick_count, 0) AS sick_count
        FROM [Employee].[dbo].[EMPLOYEE]
        LEFT JOIN 
        (
            SELECT [EMPLOYEE_SICKDAY].[EMPLOYEE_ID], COUNT([EMPLOYEE_SICKDAY].[sick_date]) AS sick_count
            FROM [Employee].[dbo].[EMPLOYEE_SICKDAY]
            ${whereClauseString}
            GROUP BY [EMPLOYEE_SICKDAY].[EMPLOYEE_ID]
        ) AS sick_employee
  
        ON sick_employee.[EMPLOYEE_ID] = [EMPLOYEE].[ID]
        `;

        return sqlQuery
    }
};