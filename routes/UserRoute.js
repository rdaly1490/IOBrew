var UserModel = require('../models/user').User; 

exports.create = function(req, res) {

  var username = req.body.username;
  var password = req.body.password;
  var firstName = req.body.first_name;
  var lastName = req.body.last_name;
  var email = req.body.email;

  UserModel.findOne({ username: { $regex: new RegExp(username, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var newUser = new UserModel(); 

      //newUser.property ... The property must equal exactly what's in the model
      newUser.username = username; 
      newUser.password = password; 
      newUser.first_name = firstName; 
      newUser.last_name = lastName;  
      newUser.email = email;
      
      newUser.save(function(err) {

        if(!err) {
          res.status(201).json({message: "User created with username: " + newUser.username });   
        } else {
          res.status(500).json({message: "Could not create User. Error: " + err});
        }

      });

    } else if(!err) {
      
      // User is trying to create a user with a name that already exists. 
      res.status(403).json({message: "User with that username already exists, please update instead of create or create a new User with a different username."});

    } else {
      res.status(500).json({message: err});
    } 
  });

}