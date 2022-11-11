var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
 
 
const label= new Schema ({ 
    _id: String,
    owner: String, 
    location: String,
    mainColor: String,
    secondaryColor: String,
    pattern: String, //percorso 
    material: String, 
    washInfo: String,
    washable: Boolean,
});
 
 
 const Label = mongoose.model('Label', label);
 
 module.exports = Label; 
 
 

 
 
 