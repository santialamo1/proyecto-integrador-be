const { Router } = require('express');
const userController = require('../../controllers/user.controller');

const router = Router();

router.post('/', userController.createUser);
router.get('/email/:email', userController.getUserByEmail);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;