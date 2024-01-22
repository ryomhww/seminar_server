// controllers/pesertaController.js
const pesertaModel = require('../models/pesertaModel');

function getAllpesertas(req, res) {
    pesertaModel.getAllpesertas((error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
}

function getpesertaById(req, res) {
    const id = req.params.id;
    pesertaModel.getpesertaById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!result) {
            return res.status(404).json({ error: 'Participant not found' });
        }
        res.status(200).json(result);
    });
}

function createpeserta(req, res) {
    const newParticipant = req.body;
    pesertaModel.createpeserta(newParticipant, (error, participantId) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ peserta_id: participantId });
    });
}

function updatepeserta(req, res) {
    const id = req.params.id;
    const updatedParticipant = req.body;
    pesertaModel.updatepeserta(id, updatedParticipant, (error, affectedRows) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }
        res.status(200).json({ message: 'Participant updated successfully' });
    });
}

function deletepeserta(req, res) {
    const id = req.params.id;
    pesertaModel.deletepeserta(id, (error, affectedRows) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }
        res.status(200).json({ message: 'Participant deleted successfully' });
    });
}

module.exports = {
    getAllpesertas,
    getpesertaById,
    createpeserta,
    updatepeserta,
    deletepeserta,
};
