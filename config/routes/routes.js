var passport = require("passport");
var express = require("express");

var checkAuthentication = function(req, res, next){
	if(req.isAuthenticated())
		return next();
	
	res.redirect('/login');
}

module.exports = function(app){
	var router = express.Router();
	
	router.get('/', function(req, res){
		res.render('login');
	});
	
	router.get('/login',function(req,res){
		var message = req.flash('error')[0];
		console.log(message);
		if(message){
			res.render('login',{message:message});
		}
		else{
			res.render('login');
		}
	});
	
	router.get('/logout',function(req,res){
		req.logout();
		res.redirect('/login');
	});
	
	router.get('/home',checkAuthentication,function(req,res){
		res.render('home');
	});
	
	router.post('/login',passport.authenticate('login',{
		successRedirect: '/home',
		failureRedirect:'/login',
		failureFlash: true
	}));
	
	app.use("/",router);
};