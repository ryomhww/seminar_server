const express = require('express');
const router = express.Router();
const pendaftaranController = require('../controllers/pendaftaranController');

router.post('/:seminar_id/register/:peserta_id', pendaftaranController.registerParticipant);
router.get('/', pendaftaranController.getAllRegistrations);
router.get('/:id', pendaftaranController.getRegistrationById);
router.delete('/:pendaftaran_id', pendaftaranController.deleteRegistration);

module.exports = router;
