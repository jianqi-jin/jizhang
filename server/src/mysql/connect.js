const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '52Zllshizhu',
    database: 'jizhang'
});

connection.connect();

exports.getUserInfo = () => connection.query('SELECT * FROM user', (err, results, fields) => {
    // console.log(fields);
})
