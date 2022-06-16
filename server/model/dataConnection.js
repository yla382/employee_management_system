const sql = require('mssql');

const sqlConfig = {
    user: 'user1',
    password: 'user1',
    database: 'Employee',
    server: 'localhost',
    port: 1433,
    options: {
        encrypt: true, 
        trustServerCertificate: true
    }
};


const sqlRequest =  async (query) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(query);
        return result;
    } catch (err) {
        console.log(err);
        return null;
    }
}


module.exports = sqlRequest;