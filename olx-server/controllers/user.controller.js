// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.login = (req, res) => {
  const data = req.body[0];
  const { username, password } = data;

  User.findOne({ username: username }, (err, foundUser) => {
    if (!err && foundUser) {
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (!err && result) {
          res.json(foundUser);
        } else {
          console.log(err);
          res.status(401).json({ error: 'Invalid username or password' });
        }
      });
    } else {
      console.log(err);
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
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
