var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var uomeSchema = new Schema({
    name          : { type: String, required: true }
  , image         : { type: String, required: false }
  , reason        : { type: String, required: true }    
  , category      : { type: String, required: true }
  , userId        : { type: String, required: false }
  , reminder      : { type: Boolean, required: true, default: false }
  , finished      : { type: Boolean, required: false, default: false}
  , date_created  : { type: Date, required: true, default: Date.now }
});

var uome = mongoose.model('uome', uomeSchema);

module.exports = {
  Uome: uome
};