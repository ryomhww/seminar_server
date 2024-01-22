const express = require('express');
const router = express.Router();
const pesertaController = require('../controllers/pesertaController');

router.get('/', pesertaController.getAllpesertas);
router.get('/:id', pesertaController.getpesertaById);
router.post('/', pesertaController.createpeserta);
router.put('/:id', pesertaController.updatepeserta);
router.delete('/:id', pesertaController.deletepeserta);

module.exports = router;
