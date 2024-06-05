const User  = require("../models/userModel");
const cache = require('../utils/cache');

class UserService {

    async getAll()
    {
        return await User.find();
    }

    async create(userData) {

        const user = new User(userData);
        return await user.save();
    }

    async read(userId) { 

        const cachedUser = await cache.get(`user:${userId}`);
        if (cachedUser) return JSON.parse(cachedUser);
        
        const user = await User.findOne({ userId });
        if (user) { 
            await cache.set(`user:${userId}`, JSON.stringify(user), 3600);
        }

        return user;
    }

    async update(userId, userData) {
        const cachedUser = await cache.del(`user:${userId}`);
        return await User.findOneAndUpdate({ userId }, userData, { new: true });
    }

    async delete(userId) {
        const cachedUser = await cache.del(`user:${userId}`);
        return await User.findOneAndDelete({ userId });
    }
}

module.exports = new UserService();
