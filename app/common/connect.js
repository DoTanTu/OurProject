var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'sa123',
    database: 'QL_TBYTE'
});

connection.connect(function(err) {
    if (err) 
    console.log('Ket noi khong thanh cong');
});

module.exports = connection;
