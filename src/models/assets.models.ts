var mongoose = require('mongoose');

// Define assets schema
var assetsSchema = new mongoose.Schema(
{   
    _id : mongoose.Schema.ObjectId,
    name : {type:String, require:true}, 
    parent : mongoose.Schema.ObjectId,
    active : {type:Boolean, require:true},
    colour : {type:String, require:true},
    icon : String,
    createdBy : {type:String, require:true}, 
    createdOn : {type:Date, require:true}, 
    lastUpdatedBy : {type:String, require:true}, 
    lastUpdatedOn : {type:Date, require:true}, 
});

// Export Mongoose model
export default mongoose.model('Category', assetsSchema);