var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var oweSchema = new Schema({
    type                  : { type: Number, required: false}
  , owerid                : { type: String, required: false, default: " " }   
  , owername              : { type: String, required: false, default: " " }   
  , owedid                : { type: String, required: false, default: " " }   
  , owedname              : { type: String, required: false, default: " " }   
  , createdby             : { type: String, required: false, default: " " }   
  , image                 : { type: String, required: false }
  , reason                : { type: String, required: false }    
  , category              : { type: String, required: false }
  , reminder              : { type: Boolean, required: false, default: false }
  , finished              : { type: Boolean, required: false, default: false }
  , date_created          : { type: Date, required: false, default: Date.now }
});

var owe = mongoose.model('owe', oweSchema);

module.exports = {
  Owe: owe
};