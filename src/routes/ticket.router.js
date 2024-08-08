const { Router } = require('express');
const TicketController = require('../../controllers/ticket.controller');

const router = Router();

/**
 * @swagger
 * /api/tickets/{cid}/purchase:
 *   put:
 *     summary: Finalize a purchase
 *     description: Completes the purchase process for a cart identified by the cart ID.
 *     parameters:
 *       - name: cid
 *         in: path
 *         required: true
 *         description: Cart ID
 *         schema:
 *           type: string
 *           example: "605c72ef16f2d82d8a2c1b3e"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 description: The method of payment used for the purchase
 *                 example: "credit card"
 *               shippingAddress:
 *                 type: string
 *                 description: The address where the purchased items will be shipped
 *                 example: "1234 Elm Street, Springfield"
 *     responses:
 *       200:
 *         description: Purchase completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Purchase finalized successfully'
 *       400:
 *         description: Bad request, invalid cart ID or purchase data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Invalid cart ID or purchase data'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Cart not found'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Server error'
 */
router.put('/:cid/purchase', TicketController.finalizePurchase);

module.exports = router;
