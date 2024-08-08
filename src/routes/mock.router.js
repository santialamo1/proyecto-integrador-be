const { Router } = require('express');
const mockController = require('../controllers/mock.controller');

const router = Router();

/**
 * @swagger
 * /api/mockingproducts:
 *   get:
 *     summary: Get mocked products
 *     description: Returns a list of 100 mocked products for testing purposes.
 *     tags:
 *       - Mock
 *     responses:
 *       200:
 *         description: A list of mocked products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the product
 *                   name:
 *                     type: string
 *                     description: The name of the product
 *                   price:
 *                     type: number
 *                     description: The price of the product
 *                   description:
 *                     type: string
 *                     description: A brief description of the product
 *                   category:
 *                     type: string
 *                     description: The category to which the product belongs
 *                   stock:
 *                     type: number
 *                     description: The amount of stock available for the product
 *               example:
 *                 - id: "60d5f8f7c21b2c6d6e5e9c0e"
 *                   name: "Mock Product 1"
 *                   price: 10.99
 *                   description: "Description of Mock Product 1"
 *                   category: "Electronics"
 *                   stock: 100
 *                 - id: "60d5f8f7c21b2c6d6e5e9c0f"
 *                   name: "Mock Product 2"
 *                   price: 25.50
 *                   description: "Description of Mock Product 2"
 *                   category: "Clothing"
 *                   stock: 50
 */
router.get('/mockingproducts', mockController.mockProducts);

module.exports = router;
