const express = require('express');
const router = express.Router();
const seminarController = require('../controllers/seminarController');

router.get('/', seminarController.getAllSeminars);
router.get('/:id', seminarController.getSeminarById);
router.post('/', seminarController.createSeminar);
router.put('/:id', seminarController.updateSeminar);
router.delete('/:id', seminarController.deleteSeminar);


module.exports = router;
