const db = require('../db');

function getAllpesertas(callback) {
    db.query('SELECT * FROM Peserta', (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
}

function getpesertaById(id, callback) {
    db.query('SELECT * FROM Peserta WHERE peserta_id = ?', [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results[0]);
    });
}

function createpeserta(newpeserta, callback) {
    db.query('INSERT INTO Peserta SET ?', newpeserta, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.insertId);
    });
}

function updatepeserta(id, updatedpeserta, callback) {
    db.query('UPDATE Peserta SET ? WHERE peserta_id = ?', [updatedpeserta, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
}

function deletepeserta(id, callback) {
    db.query('DELETE FROM Peserta WHERE peserta_id = ?', [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
}

module.exports = {
    getAllpesertas,
    getpesertaById,
    createpeserta,
    updatepeserta,
    deletepeserta,
};
