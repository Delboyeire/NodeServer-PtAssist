var AuthenticationController = require('./controllers/authentication'),  
    ExerciseController = require('./controllers/exercises'),  
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
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
    // Exercise Routes
    apiRoutes.use('/exercises', exerciseRoutes);
 
    exerciseRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['client','trainer','admin']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['trainer','admin']), TodoController.deleteTodo);
 
    // Set up routes
    app.use('/api', apiRoutes);

}