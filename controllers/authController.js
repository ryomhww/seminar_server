const AuthModel = require('../models/authModel');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUserId = await AuthModel.registerUser(username, email, password);
    res.status(201).json({ user_id: newUserId, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await AuthModel.loginUser(email, password);
    res.json(result);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};