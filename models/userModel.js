const db = require('../db');

class UserModel {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, results) => {
        if (err) {
          reject(err);
        } else {

          if (results && results.length > 0) {
            resolve(results);
          } else {
            resolve([]); 
          }
        }
      });
    });
  }

  static getUserById(userId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id_pengguna = ?', [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          
          if (results && results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null); 
          }
        }
      });
    });
  }
  static updateUser(userId, newData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET ? WHERE id_pengguna = ?', [newData, userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
  static deleteUser(userId) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id_pengguna = ?', [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
} 

module.exports = UserModel;
