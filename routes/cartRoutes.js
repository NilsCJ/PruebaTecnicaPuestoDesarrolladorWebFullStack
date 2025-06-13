const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

router.get('/', verifyToken, cartController.getCart);
router.post('/add', verifyToken, cartController.addToCart);
router.delete('/remove/:id', verifyToken, cartController.removeFromCart);

module.exports = router;
