// controllers/seminarController.js
const seminarModel = require('../models/seminarModel');

function getAllSeminars(req, res) {
    seminarModel.getAllSeminars((error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
}

function getSeminarById(req, res) {
    const id = req.params.id;
    seminarModel.getSeminarById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!result) {
            return res.status(404).json({ error: 'Seminar not found' });
        }
        res.status(200).json(result);
    });
}

function createSeminar(req, res) {
    const newSeminar = req.body;
    seminarModel.createSeminar(newSeminar, (error, seminarId) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ seminar_id: seminarId });
    });
}

function updateSeminar(req, res) {
    const id = req.params.id;
    const updatedSeminar = req.body;
    seminarModel.updateSeminar(id, updatedSeminar, (error, affectedRows) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Seminar not found' });
        }
        res.status(200).json({ message: 'Seminar updated successfully' });
    });
}

function deleteSeminar(req, res) {
    const id = req.params.id;
    seminarModel.deleteSeminar(id, (error, affectedRows) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Seminar not found' });
        }
        res.status(200).json({ message: 'Seminar deleted successfully' });
    });
}
function registerParticipant(req, res) {
  const seminarId = req.params.seminar_id;
  const pesertaId = req.params.peserta_id;

  seminarModel.registerParticipant(seminarId, pesertaId, (error, result) => {
      if (error) {
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (result === 'not_found') {
          return res.status(404).json({ error: 'Seminar or Participant not found' });
      }
      if (result === 'already_registered') {
          return res.status(409).json({ error: 'Participant already registered for this seminar' });
      }
      res.status(200).json({ message: 'Participant registered for the seminar' });
  });
}

module.exports = {
    getAllSeminars,
    getSeminarById,
    createSeminar,
    updateSeminar,
    deleteSeminar,
    registerParticipant,
};
