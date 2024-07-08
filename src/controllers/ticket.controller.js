const { TicketModel } = require('../models/ticket.model');

class TicketController {
    async createTicket(req, res) {
        try {
            const { code, amount, purchaser } = req.body;
            const purchase_datetime = new Date();

            const newTicket = new TicketModel({
                code,
                amount,
                purchase_datetime,
                purchaser,
            });

            const savedTicket = await newTicket.save();
            res.status(201).json(savedTicket);
        } catch (error) {
            console.error('Error creating ticket:', error);
            res.status(500).json({ error: 'Could not create ticket' });
        }
    }
}

module.exports = new TicketController();