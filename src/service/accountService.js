const Account = require("../models/accountModel");
const cache   = require('../utils/cache');

class AccountService {

    async getAll()
    {
        return await Account.find();
    }

    async create(AccountData) {
        const user = new Account(AccountData);
        return await user.save();
    }

    async read(accountId) {
        
        const cachedAccount = await cache.get(`account:${accountId}`);
        console.log(cachedAccount);
        if (cachedAccount) return JSON.parse(cachedAccount);
        
        const account = await Account.findOne({ accountId });
  
        if (account) { 
            await cache.set(`account:${accountId}`, JSON.stringify(account), 3600);
        }

        return account;

        // return await Account.findOne({ accountId });
    }

    async update(AccountId, AccountData) {
        const cachedAccount = await cache.del(`account:${AccountId}`);
        return await Account.findOneAndUpdate({ AccountId }, AccountData, { new: true });
    }

    async delete(AccountId) {
        const cachedAccount = await cache.del(`account:${AccountId}`);
        return await Account.findOneAndDelete({ AccountId });
    }

    async findUsername(userName)
    {
        return await Account.findOne({userName});
    }
}

module.exports = new AccountService();
