const productDAO = require('../dao/product.dao');
const { createError, errorTypes } = require('../utils/errors');
const logger = require('../config/logger');

class ProductController {
    async createProduct(req, res) {
        try {
            const productData = req.body;
            const product = await productDAO.createProduct(productData);
            logger.info('Product created successfully');
            res.status(201).json({ status: 'success', payload: product });
        } catch (error) {
            logger.error(`Error creating product: ${error.message}`);
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getProducts(req, res) {
        try {
            const { limit, page, sort, query } = req.query;
            const products = await productDAO.getProducts({ limit, page, sort, query });
            const { docs, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } = products;
            logger.info('Fetched products successfully');

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
            logger.error(`Error fetching products: ${error.message}`);
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await productDAO.getProductById(id);
            if (!product) {
                logger.warning('Product not found');
                throw createError(errorTypes.PRODUCT_NOT_FOUND);
            }
            logger.info('Fetched product by ID successfully');
            res.status(200).json({ status: 'success', payload: product });
        } catch (error) {
            logger.error(`Error fetching product by ID: ${error.message}`);
            res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const productData = req.body;
            const product = await productDAO.updateProduct(id, productData);
            logger.info('Product updated successfully');
            res.status(200).json({ status: 'success', payload: product });
        } catch (error) {
            logger.error(`Error updating product: ${error.message}`);
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await productDAO.deleteProduct(id);
            logger.info('Product deleted successfully');
            res.status(200).json({ status: 'success', message: 'Product deleted' });
        } catch (error) {
            logger.error(`Error deleting product: ${error.message}`);
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new ProductController();