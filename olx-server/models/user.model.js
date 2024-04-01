// models/userModel.js
const mongoose = require('mongoose');

const {itemSchema} = require('./items.model');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  boughtItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  listedItems: [itemSchema],
  cartItems: [itemSchema],
  wishlist: [itemSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
