const { Router } = require('express');
const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/products', (req, res) => {
    res.render('products');
});

module.exports = router;