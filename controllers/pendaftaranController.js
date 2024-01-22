// controllers/pendaftaranController.js
const pendaftaranModel = require('../models/pendaftaranModel');


function registerParticipant(req, res) {
    const seminarId = req.params.seminar_id;
    const pesertaId = req.params.peserta_id;

    pendaftaranModel.registerParticipant(seminarId, pesertaId, (error, registrationId) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ pendaftaran_id: registrationId });
    });
}
function getAllRegistrations(req, res) {
    pendaftaranModel.getAllRegistrations((error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
}

function getRegistrationById(req, res) {
    const id = req.params.id;
    pendaftaranModel.getRegistrationById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!result) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.status(200).json(result);
    });
}
function deleteRegistration(req, res) {
    const registrationId = req.params.pendaftaran_id;

    pendaftaranModel.deleteRegistration(registrationId, (error, affectedRows) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.status(200).json({ message: 'Registration deleted successfully' });
    });
}

module.exports = {
    registerParticipant,
    getAllRegistrations,
    getRegistrationById,
    deleteRegistration,
};
