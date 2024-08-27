const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    role: { type: String, default: 'user' },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    documents: [{
        name: { type: String },
        reference: { type: String }
    }],
    last_connection: { type: Date }
});

const UserModel = model('User', UserSchema);

module.exports = { UserModel };
