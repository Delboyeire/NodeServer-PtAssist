var jwt = require('jsonwebtoken');  
var User = require('../models/user');
var authConfig = require('../../config/auth');
 
function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}
 
function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
        role: request.role,
        trainer: request.trainer,
        programs: request.programs,
        name: request.name
    };
}
 
exports.login = function(req, res, next){
 
    var userInfo = setUserInfo(req.user);
    console.log(userInfo)
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
    
 
}
 
exports.registerUser = function(req, res, next){
    console.log("In register function");
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    var trainer = req.body.trainer;
    var programs= req.body.programs;
    var name = req.body.name;
    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }
 
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
 
    User.findOne({email: email}, function(err, existingUser){
 
        if(err){
            return next(err);
        }
 
        if(existingUser){
            return res.status(422).send({error: 'That email address is already in use'});
        }
 
        var user = new User({
            email: email,
            password: password,
            role: role,
            trainer: trainer,
            programs: programs,
            name: name
        });
 
        user.save(function(err, user){
 
            if(err){
                return next(err);
            }
 
            var userInfo = setUserInfo(user);
 
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
 
        });
 
    });
 
}
 
exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
 
        var user = req.user;
 
        User.findById(user._id, function(err, foundUser){
 
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
 
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
 
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
 
        });
 
    }
 
}
exports.getClients = function(req, res, next){
    
    var trainerid = req.params.trainerid;
    var _id = mongoose.Types.ObjectId.fromString(trainerid);
        User.find({trainer: _id},function(err, clients) {
 
        if (err){
            res.send(err);
        }
        res.json(clients);
 
    });
 
}
 
 
