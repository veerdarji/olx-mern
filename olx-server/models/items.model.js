// models/itemModel.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isSold: Boolean,
  description: String,
  imageUrl: String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = {Item,itemSchema};
