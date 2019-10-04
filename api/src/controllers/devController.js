const axios = require('axios');
const dev = require('../models/dev');

module.exports = {
    async index (req, res) {
        const { user } = req.headers;

        const loggedUser = await dev.findById(user);

        const users = await dev.find({
            $and: [
                { _id: { $ne: user } }, 
                { _id: { $nin: loggedUser.likes }}, 
                { _id: { $nin: loggedUser.dislikes }}
            ]
        })

        return res.json(users); 
    },

    async store(req, res) {
        const { username } = req.body;

        const devExists = await dev.findOne({ user: username });

        if (devExists) {
            return res.json(devExists); 
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        const { name, bio, avatar_url: avatar} = response.data;

        const _dev = await dev.create({
            name,
            user: username,
            bio,
            avatar
        });
        
        return res.json(_dev);
    }
}