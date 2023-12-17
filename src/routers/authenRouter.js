const router = require('express').Router();
const passport = require('passport');


router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }));

router.post('/register', (req, res, next) => {

   res.redirect('/login');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});


module.exports = router;