const productDAO = require('../dao/product.dao');

class MockController {
    async mockProducts(req, res) {
        try {
            const products = [];
            for (let i = 0; i < 100; i++) {
                const productData = {
                    name: `Product ${i}`,
                    description: `Description for product ${i}`,
                    price: Math.floor(Math.random() * 100) + 1,
                    stock: Math.floor(Math.random() * 100) + 1,
                };
                const product = await productDAO.createProduct(productData);
                products.push(product);
            }
            res.status(201).json({ status: 'success', payload: products });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new MockController();