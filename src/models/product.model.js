const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true }
});

ProductSchema.plugin(mongoosePaginate);

const ProductModel = model('Product', ProductSchema);

module.exports = { ProductModel };