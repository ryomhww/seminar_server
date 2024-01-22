// models/pendaftaranModel.js
const db = require('../db');


function registerParticipant(seminarId, pesertaId, callback) {
    // Mendapatkan nomor pendaftaran selanjutnya
    db.query('SELECT MAX(pendaftaran_id) AS maxId FROM Pendaftaran', (error, result) => {
        if (error) {
            return callback(error, null);
        }

        const nextRegistrationId = result[0].maxId + 1;

        // Mengisi data pendaftaran
        const currentDate = new Date().toISOString().split('T')[0];
        const registrationData = {
            pendaftaran_id: nextRegistrationId,
            seminar_id: seminarId,
            peserta_id: pesertaId,
            tanggal_pendaftaran: currentDate,
        };

        // Menyimpan data pendaftaran
        db.query('INSERT INTO Pendaftaran SET ?', registrationData, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, nextRegistrationId);
        });
    });
}

function getAllRegistrations(callback) {
    db.query('SELECT * FROM Pendaftaran', (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
}

function getRegistrationById(id, callback) {
    db.query('SELECT * FROM Pendaftaran WHERE pendaftaran_id = ?', [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results[0]);
    });
}
function deleteRegistration(registrationId, callback) {
    db.query('DELETE FROM Pendaftaran WHERE pendaftaran_id = ?', [registrationId], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
}

module.exports = {
    registerParticipant,
    getAllRegistrations,
    getRegistrationById,
    deleteRegistration,
};
