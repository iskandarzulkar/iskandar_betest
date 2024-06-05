const UserService       = require('../service/userService');
const AccountService    = require("../service/accountService");
const uuid              = require("uuid");
const bcrypt            = require('bcryptjs');
const jwt               = require('../utils/jwt');

class AccountController {

    async getAll(req, res)
    {
        try{

            const user = await AccountService.getAll();
            res.status(201).json(user);
        }   catch (error) {
            res.status(400).json({ error: error.message });
        }
        res.status(201).json("Hello Iskandar");
    }

    async create(req, res) 
    {
        try { 
            const account = [];
            const {userName, password, lastLoginDateTime, userId } = req.body;

            // check if exist userId 
            const user = await UserService.read(userId);

            if(!user){
                return res.status(400).json({ message: 'Not Found Id User' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const accountId = uuid.v4();
            account.push({ accountId: accountId, userName, lastLoginDateTime : new Date(), password: hashedPassword, userId });
            console.log(account);
            
            const data = await AccountService.create(account[0]);
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async read(req, res) 
    {
        try {
            const account = await AccountService.read(req.params.accountId);
            res.status(200).json(account);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) 
    {
        try {
            const account = [];

            const {userName, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            account.push({userName, password: hashedPassword });

            const data = await AccountService.update(req.params.accountId, account[0]);
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) 
    {
        try {
            await AccountService.delete(req.params.accountId);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req,res)
    {
        try {
            const {userName, password } = req.body;
            const checkAccount         = await AccountService.findUsername(userName);
            
            if(!checkAccount){
                return res.status(400).json({ message: 'Invalid username!' });
            }
            
            const isPasswordValid = await bcrypt.compare(password, checkAccount.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            
            checkAccount.lastLoginDateTime = new Date();
            await checkAccount.save();

            const token = jwt.generateToken({ _id: checkAccount._id, userId: checkAccount.userId }, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            res.send({ token });
            // return { token, checkAccount };
            // res.json({ message: 'Login successful' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new AccountController();