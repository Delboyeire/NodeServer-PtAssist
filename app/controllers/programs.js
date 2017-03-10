var Program = require('../models/program');
var User = require('../models/user');
 
exports.getPrograms = function(req, res, next){
 
    Program.find(function(err, programs) {
 
        if (err){
            res.send(err);
        }
 
        res.json(programs);
 
    });
 
}
exports.getTrainerPrograms = function(req, res, next){
 
     var trainer_id = req.params.trainer_id;
        Program.find({createdby: trainer_id},function(err, clients) {
 
        if (err){
            res.send(err);
        }
        res.json(clients);
 
    });
 
}
 
exports.createProgram = function(req, res, next){
 
    Program.create({
        title : req.body.title,
        description: req.body.description,
        exercises: req.body.exercises,
        createdby: req.body.createdby

    }, function(err, program) {
 
        if (err){
            res.send(err);
        }
 
        Program.find(function(err, programs) {
 
            if (err){
                res.send(err);
            }
 
            res.json(programs);
 
        });
 
    });
 
}
exports.addClientProgram = function(req, res, next){
 
   var new_program = {
        title : req.body.title,
        description: req.body.description,
        exercises: req.body.exercises,
        createdby: req.body.createdby};
        User.findByIdAndUpdate(req.body.client_id,{$push: {"programs": new_program}},{safe: true, upsert: true, new : true},
        function(err, program) {
            res.json(program);
        }
    );
       

   
 
}
exports.deleteProgram = function(req, res, next){
 
    Program.remove({
        _id : req.params.program_id
    }, function(err, program) {
        res.json(program);
    });
 
}