// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.login = async (req, res) => {
  try {
    const data = req.body[0];
    const { username, password } = data;

    // Find the user by username
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Populate the 'boughtItems' field on the foundUser object
    await foundUser.populate('boughtItems');

    // If everything is correct, respond with the user object
    res.json(foundUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.register = (req, res) => {
  const data = req.body[0];
  const { username, password } = data;

  bcrypt.hash(password, 10, (err, hash) => {
    const newUser = new User({
      username: username,
      password: hash,
    });

    newUser.save((err) => {
      if (!err) {
        res.json({ username });
      } else {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  });
};
