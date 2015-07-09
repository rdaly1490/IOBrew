var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var uomeSchema = new Schema({
    image              : { type: String, required: false }
  , reason             : { type: String, required: false }    
  , category           : { type: String, required: false }
  , senderId           : { type: String, required: false, default: " " }
  , recipientId        : { type: String, required: false, default: " " }
  , reminder           : { type: Boolean, required: false, default: false }
  , finished           : { type: Boolean, required: false, default: false }
  , date_created       : { type: Date, required: false, default: Date.now }
});

var uome = mongoose.model('uome', uomeSchema);

module.exports = {
  Uome: uome
};