//Setting for login

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'curp',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, curp, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE curp = ?', [curp]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.name + ' ' + user.apellidoPaterno));
        } else {
            done(null, false, req.flash('message', 'Contraseña Incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'curp',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, curp, password, done) => {

    const { name, apellidoMaterno, apellidoPaterno, email, calle, N_ext, N_int, Colonia, Municipio, estado } = req.body;
    let newUser = {
        name,
        curp,
        password,
        apellidoMaterno,
        apellidoPaterno,
        email,
        calle,
        N_ext,
        N_int,
        Colonia,
        Municipio,
        estado
    };
    newUser.password = await helpers.encryptPassword(password);
    // Saving in the Database
    const result = await pool.query('INSERT INTO users SET ? ', newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});