const userDAO = require('../dao/user.dao');
const path = require('path');
const fs = require('fs');

class UserController {
    async createUser(req, res) {
        try {
            const userData = req.body;
            if (req.file) {
                userData.profilePic = req.file.path; // Ruta del archivo subido
            }
            const user = await userDAO.createUser(userData);
            res.status(201).json({ status: 'success', payload: user });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getUserByEmail(req, res) {
        try {
            const { email } = req.params;
            const user = await userDAO.getUserByEmail(email);
            res.status(200).json({ status: 'success', payload: user });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await userDAO.getUserById(id);
            res.status(200).json({ status: 'success', payload: user });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const userData = req.body;
            if (req.file) {
                userData.profilePic = req.file.path; // Actualiza la ruta del archivo
            }
            const user = await userDAO.updateUser(id, userData);
            res.status(200).json({ status: 'success', payload: user });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await userDAO.deleteUser(id);
            res.status(200).json({ status: 'success', message: 'User deleted' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async assignPremiumRole(req, res) {
        try {
            const { id } = req.params;
            const user = await userDAO.updateUser(id, { role: 'premium' });
            res.status(200).json({ status: 'success', payload: user });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new UserController();
