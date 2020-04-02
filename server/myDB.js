/**
 * Created by mazhou on 15/4/22.
 */



var mysql = require('mysql');
var pool = mysql.createPool({
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'q1w2e3',
    database : 'test',
    charset : 'UTF8_GENERAL_CI',
    debug : false,
    connectionLimit:100
});

exports.query = function(sql,cb)
{
    pool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            }
            connection.query(sql, cb);
            connection.release();

        }
    );

}
