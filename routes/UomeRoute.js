var UomeModel = require('../models/uome').Uome; 

exports.create = function(req, res) {

//req.body.whatever has to be what the ref is in the component
  var name = req.body.name;
  var image = req.body.image;
  var reason = req.body.reason;
  var category = req.body.category;
  var reminder = req.body.reminder;
  var finished = req.body.finished;
      
  var newUome = new UomeModel(); 

    //newUome.property ... The property must equal exactly what's in the model
    newUome.name = name; 
    newUome.image = image; 
    newUome.reason = reason; 
    newUome.category = category;  
    newUome.reminder = reminder;
    newUome.finished = finished;
    
    newUome.save(function(err) {

      if(!err) {
        res.status(201).json({message: "Uome created for: " + newUome.name });   
      } else {
        res.status(500).json({message: "Could not create User. Error: " + err});
      }

    });
}