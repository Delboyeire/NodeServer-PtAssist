var mongoose = require('mongoose');
 
var ProgramSchema = new mongoose.Schema({
 
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdby: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    exercises: [
        {
            Exercise:{
                type: String
            },
            sets:{
                type: Number
            }
        } 
        ]
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Program', ProgramSchema);