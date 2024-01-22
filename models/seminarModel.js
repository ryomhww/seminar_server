const db = require('../db');

function getAllSeminars(callback) {
    db.query('SELECT * FROM Seminar', (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
}

function getSeminarById(id, callback) {
    db.query('SELECT * FROM Seminar WHERE seminar_id = ?', [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results[0]);
    });
}

function createSeminar(newSeminar, callback) {
    db.query('INSERT INTO Seminar SET ?', newSeminar, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.insertId);
    });
}

function updateSeminar(id, updatedSeminar, callback) {
    db.query('UPDATE Seminar SET ? WHERE seminar_id = ?', [updatedSeminar, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
}

function deleteSeminar(id, callback) {
    db.query('DELETE FROM Seminar WHERE seminar_id = ?', [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
}


function registerParticipant(seminarId, pesertaId, callback) {
    db.query('SELECT * FROM Seminar WHERE seminar_id = ?', [seminarId], (error, seminarResult) => {
        if (error) {
            return callback(error, null);
        }
        if (seminarResult.length === 0) {
            return callback(null, 'not_found');
        }

        db.query('SELECT * FROM Peserta WHERE peserta_id = ?', [pesertaId], (error, pesertaResult) => {
            if (error) {
                return callback(error, null);
            }
            if (pesertaResult.length === 0) {
                return callback(null, 'not_found');
            }

            db.query('SELECT * FROM Pendaftaran WHERE seminar_id = ? AND peserta_id = ?', [seminarId, pesertaId], (error, registrationResult) => {
                if (error) {
                    return callback(error, null);
                }
                if (registrationResult.length > 0) {
                    return callback(null, 'already_registered');
                }

                // Daftarkan peserta ke seminar
                const registrationData = {
                    seminar_id: seminarId,
                    peserta_id: pesertaId,
                    tanggal_pendaftaran: new Date(),
                };

                db.query('INSERT INTO Pendaftaran SET ?', registrationData, (error) => {
                    if (error) {
                        return callback(error, null);
                    }
                    return callback(null, 'success');
                });
            });
        });
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
