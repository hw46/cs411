const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '34.136.40.203',
    user: 'root',
    password: '1234',
    database: 'db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
