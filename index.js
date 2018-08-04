console.log("Session Authentication");
const credentials = require("./config/db_credentials");
const connection = require("./config/mysql_connect")(credentials);
var express = require("express");
const app = express();

//connect to the db
connection.connect(function(err){
	if (err){
		console.error("db connection error.");
		throw err;
	}
	console.log("db connected");
});

require("./config/express_config")(app);
require("./config/passport")(connection);
require("./config/routes/routes")(app);

const port = 3456;
app.listen(port,function(){
	console.log("server listening on port: "+port);
	});
