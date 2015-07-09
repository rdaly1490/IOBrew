var IouModel = require('../models/iou').Iou; 

exports.create = function(req, res) {

//req.body.whatever has to be what the ref is in the component
  var image = req.body.image;
  var reason = req.body.reason;
  var category = req.body.category;
  var reminder = req.body.reminder;
  var finished = req.body.finished;
  var senderId = req.body.senderId;
  var recipientId = req.body.recipientId;
      
  var newIou = new IouModel(); 

    //newIou.property ... The property must equal exactly what's in the model
    newIou.image = image; 
    newIou.reason = reason; 
    newIou.category = category;  
    newIou.reminder = reminder;
    newIou.finished = finished;
    newIou.senderId = senderId;
    newIou.recipientId = recipientId;
    
    newIou.save(function(err) {

      if(!err) {
        res.status(201).json({message: "Iou created for: " + newIou.name });   
      } else {
        res.status(500).json({message: "Could not create Iou. Error: " + err});
      }

    });
}

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the workout the user wants to look up. 
  IouModel.findById(id, function(err, doc) {
    if(!err && doc) {
      res.status(200).json(doc);
    } else if(err) {
      res.status(500).json({ message: "Error loading Iou." + err});
    } else {
      res.status(404).json({ message: "Iou not found."});
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

  IouModel.findById(id, function(err, doc) {
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
            res.status(500).json({message: "Could not update Iou. " + err});
          }  
        });
      } else if(!err) {
        res.status(404).json({ message: "Could not find Iou."});
      } else {
        res.status(500).json({ message: "Could not update Iou." + err});
      }
    }); 
}

exports.delete = function(req, res) {

  var id = req.body.id; 
  IouModel.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.status(200).json({ message: "Iou removed."});
    } else if(!err) {
      res.status(404).json({ message: "Could not find Iou."});
    } else {
      res.status(403).json({message: "Could not delete Iou. " + err });
    }
  });
}