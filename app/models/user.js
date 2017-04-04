var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Program = require('../models/program');
 
var UserSchema = new mongoose.Schema({
 
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['trainer', 'client', 'admin'],
        default: 'client'
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    programs:  [
       {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Program'
            }
        ],
    stats: 
       {
          bodyweight: 
              [ {
                  _id: false,
                  measurement:{ type: Number},
                 time : { type : Date, default: Date.now }
              }
              ]
        },
    name: {
        type: String,
        required: true
    },
    diet:
    {
        calories: {type: Number},
        protein: {type: Number},
        fats: {type: Number},
        carbs: {type: Number},
        fiber: {type: Number}
    }
 
}, {
    timestamps: true
});
 
UserSchema.pre('save', function(next){
 
    var user = this;
    var SALT_FACTOR = 5;
 
    if(!user.isModified('password')){
        return next();
    } 
 
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
 
        if(err){
            return next(err);
        }
 
        bcrypt.hash(user.password, salt, null, function(err, hash){
 
            if(err){
                return next(err);
            }
 
            user.password = hash;
            next();
 
        });
 
    });
 
});
 
UserSchema.methods.comparePassword = function(passwordAttempt, cb){
 
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
 
        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
 
}


 
module.exports = mongoose.model('User', UserSchema);