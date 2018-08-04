const mysql = require("mysql");

module.exports=function(credentials){
	return mysql.createConnection(credentials);
};