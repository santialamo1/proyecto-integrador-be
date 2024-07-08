const { User } = require('../models/user.model');

class UserDAO {
    async createUser(userData) {
        return await User.create(userData);
    }

    async getUserByEmail(email) {
        return await User.findOne({ email }).populate('cart');
    }

    async getUserById(id) {
        return await User.findById(id).populate('cart');
    }

    async updateUser(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true }).populate('cart');
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = new UserDAO();