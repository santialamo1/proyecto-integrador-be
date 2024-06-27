const cartDAO = require('../dao/cart.dao');

class CartController {
    async createCart(req, res) {
        try {
            const cartData = req.body;
            const cart = await cartDAO.createCart(cartData);
            res.status(201).json({ status: 'success', payload: cart });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getCartById(req, res) {
        try {
            const { id } = req.params;
            const cart = await cartDAO.getCartById(id);
            res.status(200).json({ status: 'success', payload: cart });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async updateCart(req, res) {
        try {
            const { id } = req.params;
            const cartData = req.body;
            const cart = await cartDAO.updateCart(id, cartData);
            res.status(200).json({ status: 'success', payload: cart });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async deleteCart(req, res) {
        try {
            const { id } = req.params;
            await cartDAO.deleteCart(id);
            res.status(200).json({ status: 'success', message: 'Cart deleted' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async addProductToCart(req, res) {
        try {
            const { cartId, productId } = req.params;
            const { quantity } = req.body;
            const cart = await cartDAO.addProductToCart(cartId, productId, quantity);
            res.status(200).json({ status: 'success', payload: cart });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async removeProductFromCart(req, res) {
        try {
            const { cartId, productId } = req.params;
            const cart = await cartDAO.removeProductFromCart(cartId, productId);
            res.status(200).json({ status: 'success', payload: cart });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async clearCart(req, res) {
        try {
            const { cartId } = req.params;
            const cart = await cartDAO.clearCart(cartId);
            res.status(200).json({ status: 'success', payload: cart });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new CartController();