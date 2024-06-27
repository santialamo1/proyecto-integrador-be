const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true }
});

const MessageModel = model('Message', MessageSchema);

module.exports = { MessageModel };