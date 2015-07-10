var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var achievementSchema = new Schema({
    username              : { type: String, required: false }
  , type                  : { type: String, required: false }    
  , date_created          : { type: Date, required: false, default: Date.now }
});

achievementSchema.index({username:1, type: 1}, {unique: true}); //This makes sure achievements can't be repeated.  For example if you
																//toggled Finished or not over and over you'd get the First IOU achievement
																//over and over again

var achievement = mongoose.model('achievements', achievementSchema);

module.exports = {
  Achievement: achievement
};