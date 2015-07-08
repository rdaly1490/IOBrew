var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var iouSchema = new Schema({
    image              : { type: String, required: false }
  , reason             : { type: String, required: true }    
  , category           : { type: String, required: true }
  , senderId           : { type: String, required: true, default: " " }
  , recipientId        : { type: String, required: true, default: " " }
  , reminder           : { type: Boolean, required: true, default: false }
  , finished           : { type: Boolean, required: false, default: false}
  , date_created       : { type: Date, required: true, default: Date.now }
});

var iou = mongoose.model('iou', iouSchema);

module.exports = {
  Iou: iou
};