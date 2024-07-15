const { Router } = require('express');
const mockController = require('../controllers/mock.controller');

const router = Router();

router.get('/mockingproducts', mockController.mockProducts);

module.exports = router;