const expressSession=require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash");
var passport = require("passport");

module.exports = function(app){
	app.set('views',__dirname+"../../views");
	app.set('view engine','jade');
	
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended:"true"}));
	app.use(bodyParser.json());
	app.use(expressSession({secret:'myDemoKey',resave:false,saveUninitialized:true}));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
};	

