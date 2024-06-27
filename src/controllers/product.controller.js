const productDAO = require('../dao/product.dao');

class ProductController {
    async createProduct(req, res) {
        try {
            const productData = req.body;
            const product = await productDAO.createProduct(productData);
            res.status(201).json({ status: 'success', payload: product });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getProducts(req, res) {
        try {
            const { limit, page, sort, query } = req.query;
            const products = await productDAO.getProducts({ limit, page, sort, query });
            const { docs, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } = products;

            res.status(200).json({
                status: 'success',
                payload: docs,
                totalPages,
                prevPage,
                nextPage,
                page: products.page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?page=${prevPage}` : null,
                nextLink: hasNextPage ? `/api/products?page=${nextPage}` : null
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await productDAO.getProductById(id);
            res.status(200).json({ status: 'success', payload: product });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const productData = req.body;
            const product = await productDAO.updateProduct(id, productData);
            res.status(200).json({ status: 'success', payload: product });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await productDAO.deleteProduct(id);
            res.status(200).json({ status: 'success', message: 'Product deleted' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new ProductController();