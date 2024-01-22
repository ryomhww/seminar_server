// controllers/user_controller.js
const UserModel = require('../models/userModel');

class UserController {
  static getAllUsers(req, res) {
    UserModel.getAllUsers()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json({ error: err.message }));
  }

  static getUserById(req, res) {
    const userId = req.params.userId;

    UserModel.getUserById(userId)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  }

  static async updateUser(req, res) {  // Tambahkan "static" dan "async"
    const userId = req.params.id;
    const newData = req.body;
    try {
      const isUpdated = await UserModel.updateUser(userId, newData);
      if (isUpdated) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteUser(req, res) {  // Tambahkan "static" dan "async"
    const userId = req.params.id;
    try {
      const isDeleted = await UserModel.deleteUser(userId);
      if (isDeleted) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
