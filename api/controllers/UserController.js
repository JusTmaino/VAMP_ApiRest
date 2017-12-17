/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var EmailAddresses = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');

module.exports = {
		/*******************		CREATE USER			**************************/
	 create: function createFn(req, res){
		
		var username = req.param('username');
		var firstName = req.param('firstName');
		var lastName = req.param('lastName');
		var bDay = req.param('bDay');
		var email = req.param('email');
		var tel = req.param('tel');
		var avatar = req.param('avatar');
		var homeAddress = req.param('homeAddress');
		var settings = req.param('settings');
		var cars = req.param('cars');
		// validate the email address that is passed in
			EmailAddresses.validate({
			  string: email,
			}).exec({
					// called if email is invalid
				invalid: function(){
					return res.badRequest('Does not look like an email address to me!');
				},
				// called if there is a general error
				error: function(err){
					console.log('the error is '+err);
					return res.serverError(err);
				},

				// called if the email validation passed
				success: function(){
						// encrypt the password
					// get password from the body of the request with the req.param call
					Passwords.encryptPassword({
						 password: req.param('password'),
					 }).exec({
						 // if there is an error return a server error 500 status code
						 error: function(err){
							 return res.serverError(err);
						 },

						 // if success then move on to the next step
						 success: function(result){
								 var user = {
											 username : username,
											 firstName : firstName,
											 lastName : lastName,
											 bDay : bDay,
											 email : email,
											 tel : tel,
											 password: result,
											 avatar : avatar,
											 homeAddress : homeAddress,
											 settings : settings,
											 cars : cars,
								};
							// User waterline to create a new user by calling .create and passing in the local user variable
								 User.create(user, function (err, createdResult) {
									 // check for errors
									 if (err) {
										
										 if (err.invalidAttributes
											 && err.invalidAttributes.email
											 && err.invalidAttributes.email[0]
											 && err.invalidAttributes.email[0].rule === 'unique' || 
											  err.invalidAttributes.username
											 && err.invalidAttributes.username[0]
											 && err.invalidAttributes.username[0].rule === 'unique') {
											 return res.alreadyInUse(err);
										 }

										 return res.serverError(err);
									 }

									 // add user id to session state
									 req.session.user = createdResult.id;
									 // return back created user with a status code of 200
									 // see api\responses\ok.js for what the ok response is actually doing
									 return res.ok(createdResult);
								 });
						 }
					 })
				}
			});		
	 },
	 
		/************		LOGUIN		***************/
	  login: function loginFn(req, res) {
			 User.findOne(
				 { 
					 email: req.param('email') 
				 }, 
				 function (err, result) {
					if (err) return res.serverError(err);
					if (!result) return res.forbidden('Please Sign up First!')
				Passwords.checkPassword({
				 passwordAttempt: req.param('password'),
				 encryptedPassword: result.password
				 
				 }).exec({
					 error: function (err) {
						 console.log('Error');
						 return res.serverError(err);
					 },

					 incorrect: function () {
						 console.log('Invalid Login, Please Try Again !');
						 return res.forbidden('Invalid Login, Please Try Again!');
					 },

					 success: function () {
						  console.log('Sucess');
						 req.session.user = result.id;
						 return res.ok(result);
					 }
				 })
				 }
			 )

		},
		
		/************		LOGOUT		***************/
		 logout: function logoutFn(req, res) {
			 req.session.user = null;
			console.log('disconnected');
			 return res.ok();
		 },
		 
		 /************		USERS LOGIN		***************/
		  userIdentity: function (req, res) {
			  User.findOne(
				  { id: req.session.user }, 
				  function (err, result) {
					  console.log(result);
					  if (err) return res.serverError(err);
					  if (!result) return res.notFound();
					  
					  return res.ok(result);      
				  }
				);
		  },
		  /********************		STUB FUNCTION (GET ONLY THE USER IN SESSION)	************************/
	 	   find: function findFn(req, res) {
				 User.find(
					 { id: req.session.user }, 
					 function (err, results) {
						 console.log(results);
						 if (err) return res.serverError(err);
						 if (results.length === 0) return res.notFound();
						 return res.ok(results);
					 }
				 );
			}, 
			findOne: function findOneFn(req, res) {
				User.findOne(
					{ id: req.session.user }, 
					function (err, result) {
						if (err) return res.serverError(err);
						if (!result) return res.notFound();

						return res.ok(result);
					}
				); 
			},
		  /********************			UPDATE USER			************************/
		   update: function updateFn(req, res){
			   var username = req.param('username');
				var firstName = req.param('firstName');
				var lastName = req.param('lastName');
				var bDay = req.param('bDay');
				var email = req.param('email');
				var tel = req.param('tel');
				var avatar = req.param('avatar');
				var homeAddress = req.param('homeAddress');
				var settings = req.param('settings');
				var cars = req.param('cars');
				 EmailAddresses.validate({
					   string: req.param('email'),
					 }).exec({
					   error: function (err) {
						 return res.serverError(err);
					   },

					   invalid: function () {
						   console.log('Does not look like an email address to me!');
						 return res.badRequest('Does not look like an email address to me!');
					   },

					   success: function () {

					   },
				});
				
				 Passwords.encryptPassword({
				 password: req.param('password'),
				 }).exec({
					 error: function(err){
					 return res.serverError(err);
					 },

					 success: function(result){
						 var user = {
										 username : username,
										 firstName : firstName,
										 lastName : lastName,
										 bDay : bDay,
										 email : email,
										 tel : tel,
										 password: result,
										 avatar : avatar,
										 homeAddress : homeAddress,
										 settings : settings,
										 cars : cars,
						 }
						 User.update(
							 { id: req.session.user },
							 user,
							 function (err, result) {
							 if (err) return res.serverError(err);
							 if (result.length === 0)  console.log('not found!');
							 return res.notFound();

							 return res.ok(result);
							 }
						 );
					 },
				 });
			},
			
		  /********************			DELETE USER			************************/
			
			delete: function deleteFn(req, res) {
				 User.delete(
					 {
					 id: req.session.user
					 }
				 ), function (err, result) {
					 if (err) return res.serverError(err);
					 if (!result) return res.notFound();

					 req.session.user = null;
					 return res.ok(result);
				 }
			 }
				  
				  
		  
		  
		  
/*		
 */
};

