const { Router } = require('express');
const cartController = require('../../controllers/cart.controller');

const router = Router();

router.post('/', cartController.createCart);
router.get('/:id', cartController.getCartById);
router.put('/:id', cartController.updateCart);
router.delete('/:id', cartController.deleteCart);
router.put('/:cartId/products/:productId', cartController.addProductToCart);
router.delete('/:cartId/products/:productId', cartController.removeProductFromCart);
router.delete('/:cartId', cartController.clearCart);

module.exports = router;