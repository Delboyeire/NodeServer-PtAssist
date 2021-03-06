var mongoose = require('mongoose');
 
var ExerciseSchema = new mongoose.Schema({
 
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String
    },
    image: {
        type: String
    }
 
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Exercise', ExerciseSchema);