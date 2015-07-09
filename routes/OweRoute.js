var oweModel = require('../models/owe').Owe; 

exports.create = function(req, res) {

//req.body.whatever has to be what the ref is in the component
  var type = req.body.type;
  var image = req.body.image;
  var reason = req.body.reason;
  var category = req.body.category;
  var reminder = req.body.reminder;
  var finished = req.body.finished;
  var owerid = req.body.owerid;
  var owername = req.body.owername;
  var owedid = req.body.owedid;
  var owedname = req.body.owedname;
  var createdby = req.body.createdby;

  var newOwe = new oweModel(); 

    //newIou.property ... The property must equal exactly what's in the model
    newOwe.type = type;
    newOwe.image = image; 
    newOwe.reason = reason; 
    newOwe.category = category;  
    newOwe.reminder = reminder;
    newOwe.finished = finished;
    newOwe.owerid = owerid;
    newOwe.owername = owername;
    newOwe.owedid = owedid;
    newOwe.owedname = owedname;
    newOwe.createdby = createdby;
    
    newOwe.save(function(err) {

      if(!err) {
        res.status(201).json({message: "Iou created for: " + newOwe.name });   
      } else {
        res.status(500).json({message: "Could not create Iou. Error: " + err});
      }

    });
}

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the workout the user wants to look up. 
  oweModel.findById(id, function(err, doc) {
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
  var type = req.body.type;
  var image = req.body.image;
  var reason = req.body.reason;
  var category = req.body.category;
  var reminder = req.body.reminder;
  var finished = req.body.finished;
  var owerid = req.body.owerid;
  var owername = req.body.owername;
  var owedid = req.body.owedid;
  var owedname = req.body.owedname;
  var createdby = req.body.createdby;

  oweModel.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.type = type;
        doc.image = image; 
        doc.reason = reason; 
        doc.category = category;  
        doc.reminder = reminder;
        doc.finished = finished;
        doc.owerid = owerid;
        doc.owername = owername;
        doc.owedid = owedid;
        doc.owedname = owedname;
        doc.createdby = createdby;
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
  oweModel.findById(id, function(err, doc) {
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