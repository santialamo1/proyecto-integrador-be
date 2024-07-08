class TicketDTO {
    constructor(ticket) {
        this.id = ticket._id;
        this.code = ticket.code;
        this.purchaseDatetime = ticket.purchaseDatetime;
        this.amount = ticket.amount;
        this.purchaser = ticket.purchaser;
    }
}

module.exports = TicketDTO;