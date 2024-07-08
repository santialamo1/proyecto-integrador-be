const { Router } = require('express');
const TicketController = require('../../controllers/ticket.controller');

const router = Router();

router.put('/:cid/purchase', TicketController.finalizePurchase);

module.exports = router;