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
        exerciseRoutes = express.Router(),
        programRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.registerUser);
    
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.sendStatus({ content: 'Success'});
    });
    authRoutes.get('/:trainerid', requireAuth, AuthenticationController.roleAuthorization(['trainer']), AuthenticationController.getClients);
    authRoutes.delete('/delete/:user_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), AuthenticationController.deleteClient);
    authRoutes.get('/clientdetail/:client_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','client']), AuthenticationController.getClientDetails);
    authRoutes.post('/stats/weight/:client_id', requireAuth, AuthenticationController.roleAuthorization(['client','trainer']), AuthenticationController.addBodyweight);
    authRoutes.post('/diet/:client_id', requireAuth, AuthenticationController.roleAuthorization(['trainer']), AuthenticationController.updateDiet);
    // Exercise Routes
    apiRoutes.use('/exercises', exerciseRoutes);
 
    exerciseRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['client','trainer','admin']), ExerciseController.getExercises);
    exerciseRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['client','trainer','admin']), ExerciseController.getExercises);
    exerciseRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ExerciseController.createExercise);
    exerciseRoutes.delete('/:exercise_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ExerciseController.deleteExercise);
 
    // Program Routes
    apiRoutes.use('/programs', programRoutes);
 
    programRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['client','trainer','admin']), ProgramController.getPrograms);
    programRoutes.get('/trainer/:trainer_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ProgramController.getTrainerPrograms);
    programRoutes.get('/client_programs/:client_id', requireAuth, AuthenticationController.roleAuthorization(['client','trainer','admin']), ProgramController.returnClientPrograms);
    programRoutes.get('/client_stats/bodyweight/:client_id', requireAuth, AuthenticationController.roleAuthorization(['client','trainer','admin']), ProgramController.returnClientWeights);
    programRoutes.get('/diet/:client_id', requireAuth, AuthenticationController.roleAuthorization(['client','trainer','admin']), ProgramController.returnClientDiet);
    programRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ProgramController.createProgram);
    programRoutes.post('/client/:client_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ProgramController.addClientProgram);
    programRoutes.delete('/:exercise_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ProgramController.deleteProgram);
    programRoutes.delete('/client/delete/:client_id/:program_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), ProgramController.removeClientProgram);
 
    // Set up routes
    app.use('/api', apiRoutes);

}