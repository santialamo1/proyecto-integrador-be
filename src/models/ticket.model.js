const { Schema, model } = require('mongoose');

const TicketSchema = new Schema({
    code: { type: String, required: true, unique: true },
    purchaseDatetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
});

const Ticket = model('Ticket', TicketSchema);

module.exports = { Ticket };