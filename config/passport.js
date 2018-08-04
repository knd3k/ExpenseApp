var passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); 



var checkValidPassword = function(dbpassword, password){
	return bcrypt.compareSync(password, dbpassword);
}

module.exports = function(connection){
	
		passport.use('login', new localStrategy(
			function(username,password,done){
				//find one user
				var queryUser = "select * from users where userName=?";
				connection.query(queryUser,[username],function(err,rows,fields){
					if (err){
						console.error("error performing find one user query");
						return done(err);
					}

					if (rows.length==0){
						console.log("user not found");
						return done(null,false,{message:"User not found"});
					}
					
					
					if(!checkValidPassword(rows[0].password,password)){
							console.log("password invalid");
							return done(null,false,{message:"User password incorrect"});
					}
					console.log("authentication passed");
					return done(null,rows[0]);
				});
				
			}
		));
		
		passport.serializeUser(function(user,done){
			done(null, user.id);
		});
		passport.deserializeUser(function(id,done){
			//find by id
			var queryId="select * from users where id=?";
			connection.query(queryId,[id],function(err,rows,fields){
				done(err,rows[0]);
			});
		});
};	