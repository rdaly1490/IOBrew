var AchievementsModel = require('../models/achievements').Achievement; 

exports.create = function(req, res) {

//req.body.whatever has to be what the ref is in the component
  var username = req.body.username;
  var type = req.body.type;
      
  var newAchievement = new AchievementsModel(); 

    //newIou.property ... The property must equal exactly what's in the model
    newAchievement.username = username; 
    newAchievement.type = type; 
    
    newAchievement.save(function(err) {

      if(!err) {
        res.status(201).json({message: "Achievement created for: " + newAchievement.type });   
      } else {
        res.status(500).json({message: "Could not create Achievement. Error: " + err});
      }

    });
}

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the workout the user wants to look up. 
  AchievementsModel.findById(id, function(err, doc) {
    if(!err && doc) {
      res.status(200).json(doc);
    } else if(err) {
      res.status(500).json({ message: "Error loading Achievement." + err});
    } else {
      res.status(404).json({ message: "Achievement not found."});
    }
  });
}

exports.update = function(req, res) {
  
  var id = req.params.id;  
  var username = req.body.username;
  var type = req.body.type;

  AchievementsModel.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.username = username; 
        doc.type = type;  
        doc.save(function(err) {
          if(!err) {
            res.status(200).json(doc);
          } else {
            res.status(500).json({message: "Could not update Achievement. " + err});
          }  
        });
      } else if(!err) {
        res.status(404).json({ message: "Could not find Achievement."});
      } else {
        res.status(500).json({ message: "Could not update Achievement." + err});
      }
    }); 
}

exports.delete = function(req, res) {

  var id = req.body.id; 
  AchievementsModel.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.status(200).json({ message: "Achievement removed."});
    } else if(!err) {
      res.status(404).json({ message: "Could not find Achievement."});
    } else {
      res.status(403).json({message: "Could not delete Achievement. " + err });
    }
  });
}