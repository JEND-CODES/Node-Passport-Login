const express = require('express');
const router = express.Router();
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');

// Error Page 
router.get('/error', (req, res) => res.render('error', {
    new_error: 'Identifiants non reconnus',
    error_info: 'Votre email ou votre mot de passe ne sont pas valides'
  }));

// Homepage Login
router.get('/homepage', forwardAuthenticated, (req, res) => res.render('homepage'));

router.post('/homepage', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/connexion/error',
  })(req, res, next);
});

// Logout
router.get('/logoutAdmin', (req, res) => {
  req.logout();
  res.redirect('/connexion/homepage');
});

module.exports = router;