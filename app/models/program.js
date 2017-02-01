var mongoose = require('mongoose');
 
var ProgramSchema = new mongoose.Schema({
 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    exercises: [
     {type: Schema.Types.ObjectId, ref: 'Exercise'},
     {
         sets:
         {
             type: Number
         }
     } ]
 
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Program', ProgramSchema);