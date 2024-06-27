const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const passport = require('passport');
const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', AuthController.githubCallback);

module.exports = router;