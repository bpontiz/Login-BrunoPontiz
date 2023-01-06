import { Router } from 'express';
import session from 'express-session';
import isAuth from '../server.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const apiRoutes = Router();

apiRoutes.get('/', isAuth, (req, res) => {
    res.redirect('/datos');
});

apiRoutes.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html')
});

apiRoutes.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' })
);

apiRoutes.get('/failregister', (req, res) => {
    res.render('register-error');
});

apiRoutes.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

apiRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/datos' })
);

apiRoutes.get('/faillogin', (req, res) => {
    res.render('login-error');
})

apiRoutes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

export default apiRoutes;