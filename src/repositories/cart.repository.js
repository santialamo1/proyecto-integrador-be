const { Cart } = require('../models/cart.model');

class CartDAO {
    async createCart(cartData) {
        return await Cart.create(cartData);
    }

    async getCartById(id) {
        return await Cart.findById(id).populate('products.product');
    }

    async updateCart(id, cartData) {
        return await Cart.findByIdAndUpdate(id, cartData, { new: true }).populate('products.product');
    }

    async deleteCart(id) {
        return await Cart.findByIdAndDelete(id);
    }

    async addProductToCart(cartId, productId, quantity) {
        return await Cart.findByIdAndUpdate(
            cartId,
            { $push: { products: { product: productId, quantity } } },
            { new: true }
        ).populate('products.product');
    }

    async removeProductFromCart(cartId, productId) {
        return await Cart.findByIdAndUpdate(
            cartId,
            { $pull: { products: { product: productId } } },
            { new: true }
        ).populate('products.product');
    }

    async clearCart(cartId) {
        return await Cart.findByIdAndUpdate(
            cartId,
            { $set: { products: [] } },
            { new: true }
        ).populate('products.product');
    }
}

module.exports = new CartDAO();