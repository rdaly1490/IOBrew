var IouModel = require('../models/iou').Iou; 

exports.create = function(req, res) {

//req.body.whatever has to be what the ref is in the component
  var name = req.body.name;
  var image = req.body.image;
  var reason = req.body.reason;
  var category = req.body.category;
  var reminder = req.body.reminder;
  var finished = req.body.finished;
      
  var newIou = new IouModel(); 

    //newIou.property ... The property must equal exactly what's in the model
    newIou.name = name; 
    newIou.image = image; 
    newIou.reason = reason; 
    newIou.category = category;  
    newIou.reminder = reminder;
    newIou.finished = finished;
    
    newIou.save(function(err) {

      if(!err) {
        res.status(201).json({message: "Iou created for: " + newIou.name });   
      } else {
        res.status(500).json({message: "Could not create User. Error: " + err});
      }

    });
}