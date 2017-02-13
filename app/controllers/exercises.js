var Exercise = require('../models/exercise');
 
exports.getExercises = function(req, res, next){
 
    Exercise.find(function(err, exercises) {
 
        if (err){
            res.send(err);
        }
 
        res.json(exercises);
 
    });
 
}
 
exports.createExercise = function(req, res, next){
 
    Exercise.create({
        name : req.body.name,
        description: req.body.description,
        videolink: req.body.videolink

    }, function(err, exercise) {
 
        if (err){
            res.send(err);
        }
 
        Exercise.find(function(err, exercise) {
 
            if (err){
                res.send(err);
            }
 
            res.json(exercises);
 
        });
 
    });
 
}
 
exports.deleteExercise = function(req, res, next){
 
    Exercise.remove({
        _id : req.params.exercise_id
    }, function(err, todo) {
        res.json(exercise);
    });
 
}