const UserService   = require('../service/userService');
const uuid          = require('uuid');

class UserController {

    async getAll(req, res)
    {
        try{
            const user = await UserService.getAll();
            res.status(201).json(user);
        }   catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const users = [];

            const {fullName, emailAddress } = req.body;
            const userId                = uuid.v4();
            const accountNumber         = uuid.v4();
            const registrationNumber    = uuid.v4();
            
            users.push({ userId: userId, fullName, emailAddress, accountNumber : accountNumber, registrationNumber: registrationNumber });

            const user = await UserService.create(users[0]);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async read(req, res) {
        try {
            const user = await UserService.read(req.params.userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const user = await UserService.update(req.params.userId, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await UserService.delete(req.params.userId);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UserController();