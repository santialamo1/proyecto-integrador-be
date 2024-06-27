class SessionsController {
    async currentSession(req, res) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).send({ status: 'error', message: 'No session found' });
            }
            res.send({ status: 'success', payload: user });
        } catch (error) {
            res.status(500).send({ status: 'error', message: error.message });
        }
    }
}

module.exports = new SessionsController();