const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload');

// Solo admins pueden crear, editar, eliminar
router.post('/', verifyToken, requireRole('admin'), upload.single('imagen'), productController.create);
router.put('/:id', verifyToken, requireRole('admin'), upload.single('imagen'), productController.update);
router.delete('/:id', verifyToken, requireRole('admin'), productController.remove);

// Público o autenticado puede ver
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);

module.exports = router;
