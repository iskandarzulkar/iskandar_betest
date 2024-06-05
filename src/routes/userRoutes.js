const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/middlewares.js');

router.get('/', UserController.getAll);
router.post('/', authMiddleware, UserController.create);
router.get('/:userId', authMiddleware, UserController.read);
router.put('/:userId', authMiddleware, UserController.update);
router.delete('/:userId', authMiddleware, UserController.delete);

module.exports = router;