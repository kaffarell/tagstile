var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
 
 
 const wash= new Schema ({ 
    labelId: String,
    date: Date,
    location: String, 
    washingMachine: String,
 });
 
 
 const Wash = mongoose.model('Wash', wash);
 
 module.exports = Wash; 
 
 
 wash.path('_id'); 

 
 
 