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
            exercise:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Exercise'
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