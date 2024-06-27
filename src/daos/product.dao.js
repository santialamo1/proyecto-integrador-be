const { Product } = require('../models/product.model');

class ProductDAO {
    async createProduct(productData) {
        return await Product.create(productData);
    }

    async getProducts({ limit = 10, page = 1, sort, query }) {
        const options = {
            page,
            limit,
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
        };
        const queryObj = query ? { $or: [{ category: query }, { availability: query }] } : {};
        return await Product.paginate(queryObj, options);
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async updateProduct(id, productData) {
        return await Product.findByIdAndUpdate(id, productData, { new: true });
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductDAO();