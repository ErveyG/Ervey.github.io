const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
var url, registro;

//Index
router.get('/', (req, res) => {
    url = true;
    registro = false;
    profile = true;
    res.render('partials/login.hbs', { url, registro, profile });
})

router.post('/', passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/registro', (req, res) => {
    url = true;
    registro = true;
    res.render('partials/registro', { url, registro });
})

router.get('/profile', (req, res) => {
    profile = false;
    url = false;
    res.render('partials/profile', { url, profile });
})

router.post('/registro', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/registro',
    failureFlash: true
}));
module.exports = router;