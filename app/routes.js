var AuthenticationController = require('./controllers/authentication'),  
    ExerciseController = require('./controllers/exercises'), 
    ProgramController = require('./controllers/programs'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        exerciseRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.registerUser);
    
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.sendStatus({ content: 'Success'});
    });
    authRoutes.get('/:trainerid', requireAuth, AuthenticationController.roleAuthorization(['trainer']), AuthenticationController.getClients);
    authRoutes.delete('/delete/:exercise_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), AuthenticationController.deleteClient);
 
    // Exercise Routes
    apiRoutes.use('/exercises', exerciseRoutes);
 
    exerciseRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['client','trainer','admin']), ExerciseController.getExercises);
    exerciseRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ExerciseController.createExercise);
    exerciseRoutes.delete('/:exercise_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ExerciseController.deleteExercise);
 
    // Program Routes
    apiRoutes.use('/programs', programRoutes);
 
    programRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['client','trainer','admin']), ProgramController.getPrograms);
    programRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ProgramController.createProgram);
    programRoutes.delete('/:exercise_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ProgramController.deleteProgram);
 
    // Set up routes
    app.use('/api', apiRoutes);

}