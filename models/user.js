var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var userSchema = new Schema({
    username      : { type: String, required: true, trim: true, index: { unique: true } }
  , password      : { type: String, required: true }
  , first_name    : { type: String, required: true }    
  , last_name     : { type: String, required: true }
  , email         : { type: String, required: true }
  , date_created  : { type: Date, required: true, default: Date.now }
});

var user = mongoose.model('user', userSchema);

module.exports = {
  User: user
};