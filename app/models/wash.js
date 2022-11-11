var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
 
 
 const wash= new Schema ({ 
     owner: String, 
     location: String,
     mainColor: String,
     secondaryColor: String,
     pattern: String,
     material: String, 
     washInfo: String,
     washable: Boolean,
 });
 
 
 const Wash = mongoose.model('Wash', wash);
 
 module.exports = Wash; 
 
 
 label.path('_id'); 

 
 
 