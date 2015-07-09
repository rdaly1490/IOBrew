var UomeModel = require('../models/uome').Uome; 

exports.create = function(req, res) {

//req.body.whatever has to be what the ref is in the component
  var image = req.body.image;
  var reason = req.body.reason;
  var category = req.body.category;
  var reminder = req.body.reminder;
  var finished = req.body.finished;
  var senderId = req.body.senderId;
  var recipientId = req.body.recipientId;
      
  var newUome = new UomeModel(); 

    //newUome.property ... The property must equal exactly what's in the model
    newUome.image = image; 
    newUome.reason = reason; 
    newUome.category = category;  
    newUome.reminder = reminder;
    newUome.finished = finished;
    newUome.senderId = senderId;
    newUome.recipientId = recipientId;
    
    newUome.save(function(err) {

      if(!err) {
        res.status(201).json({message: "Uome created for: " + newUome.name });   
      } else {
        res.status(500).json({message: "Could not create Uome. Error: " + err});
      }

    });
}

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the workout the user wants to look up. 
  UomeModel.findById(id, function(err, doc) {
    if(!err && doc) {
      res.status(200).json(doc);
    } else if(err) {
      res.status(500).json({ message: "Error loading Uome." + err});
    } else {
      res.status(404).json({ message: "Uome not found."});
    }
  });
}

exports.update = function(req, res) {
  
  var id = req.params.id;  
  var image = req.body.image;
  var reason = req.body.reason;
  var category = req.body.category;
  var reminder = req.body.reminder;
  var finished = req.body.finished;
  var senderId = req.body.senderId;
  var recipientId = req.body.recipientId;

  UomeModel.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.image = image; 
        doc.reason = reason; 
        doc.category = category;  
        doc.reminder = reminder;
        doc.finished = finished;
        doc.senderId = senderId;
        doc.recipientId = recipientId;
        doc.save(function(err) {
          if(!err) {
            res.status(200).json(doc);    
          } else {
            res.status(500).json({message: "Could not update Uome. " + err});
          }  
        });
      } else if(!err) {
        res.status(404).json({ message: "Could not find Uome."});
      } else {
        res.status(500).json({ message: "Could not update Uome." + err});
      }
    }); 
}

exports.delete = function(req, res) {

  var id = req.body.id; 
  UomeModel.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.status(200).json({ message: "Uome removed."});
    } else if(!err) {
      res.status(404).json({ message: "Could not find Uome."});
    } else {
      res.status(403).json({message: "Could not delete Uome. " + err });
    }
  });
}







