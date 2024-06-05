const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController');
const authMiddleware = require('../middlewares/middlewares');

router.get('/', authMiddleware, AccountController.getAll);
router.post('/', AccountController.create);
router.get('/:accountId', authMiddleware, AccountController.read);
router.put('/:accountId', authMiddleware, AccountController.update);
router.delete('/:accountId', authMiddleware, AccountController.delete);
router.post('/login', AccountController.login);

module.exports = router;