const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserDAO = require('../repositories/user.repository');
const { comparePasswords } = require('../utils/jwt');
const config = require('../config');

passport.use('register', new localStrategy({
    passReqToCallback: true,
    usernameField: 'email'
}, async (req, email, password, done) => {
    try {
        const user = await UserDAO.createUser(req.body);
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.use('login', new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await UserDAO.findUserByEmail(email);
        if (!user) return done(null, false, { message: 'Incorrect email.' });
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserDAO.findUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;