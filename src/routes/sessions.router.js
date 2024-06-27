const { Router } = require('express');
const SessionsController = require('../controllers/sessions.controller');
const passport = require('passport');
const router = Router();

router.get('/current', passport.authenticate('jwt', { session: false }), SessionsController.currentSession);

module.exports = router;