const { MessageModel } = require('../models/message.model');

class MessageDAO {
    async getAllMessages() {
        return await MessageModel.find();
    }

    async createMessage(messageData) {
        return await MessageModel.create(messageData);
    }
}

module.exports = new MessageDAO();