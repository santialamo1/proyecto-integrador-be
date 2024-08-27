const passport = require('passport');
const { generateToken } = require('../utils/jwt');
const UserDAO = require('../repositories/user.repository');

class AuthController {
    async register(req, res, next) {
        passport.authenticate('register', async (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/register');

            if (req.body.premium) {
                user.role = 'premium';
                await UserDAO.updateUser(user._id, { role: 'premium' });
            }

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
}

module.exports = new AuthController();
