const axios = require('axios');
const dev = require('../models/dev');

module.exports = {
    async store(req, res) {
        const { id } = req.params;
        const { user } = req.headers;

        const loggedUser = await dev.findById(user);
        const targetUser = await dev.findById(id);
        
        if (!targetUser) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        loggedUser.dislikes.push(targetUser._id);

        await loggedUser.save();

        return res.json(loggedUser);
    }
}