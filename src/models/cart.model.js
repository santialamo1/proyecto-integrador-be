const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ]
});

const CartModel = model('Cart', CartSchema);

module.exports = { CartModel };