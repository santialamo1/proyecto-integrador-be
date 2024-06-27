const passport = require('passport');
const { generateToken } = require('../utils/jwt');
const UserDAO = require('../daos/user.dao');

class AuthController {
    async register(req, res, next) {
        passport.authenticate('register', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/register');
            res.redirect('/login');
        })(req, res, next);
    }

    async login(req, res, next) {
        passport.authenticate('login', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/login');
            const token = generateToken(user);
            res.cookie('jwt', token, { httpOnly: true });
            res.redirect('/products');
        })(req, res, next);
    }

    async logout(req, res) {
        res.clearCookie('jwt');
        res.redirect('/login');
    }

    async githubCallback(req, res, next) {
        passport.authenticate('github', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/login');
            const token = generateToken(user);
            res.cookie('jwt', token, { httpOnly: true });
            res.redirect('/products');
        })(req, res, next);
    }
}

module.exports = new AuthController();