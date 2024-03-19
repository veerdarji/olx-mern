// controllers/itemController.js
const {Item} = require('../models/items.model');
const User = require('../models/user.model');

exports.getAllItems = (req, res) => {
  Item.find({ isSold: false }, (err, foundItems) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(foundItems);
    }
  });
};

exports.createNewItem = (req, res) => {
  const data = req.body[0];
  const { itemName, itemPrice, itemImgUrl, itemDescription, userName, userId } = data;

  const newItem = new Item({
    name: itemName,
    price: itemPrice,
    isSold: false,
    imageUrl: itemImgUrl,
    description: itemDescription,
  });

  newItem.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      User.findOne({ _id: userId }, (err, foundUser) => {
        if (!err) {
          User.findOneAndUpdate(
            { _id: foundUser._id },
            { listedItems: [...foundUser.listedItems, newItem] },
            { returnOriginal: false },
            (err, updatedUser) => {
              if (!err) {
                res.json(updatedUser);
              } else {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
              }
            }
          );
        } else {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
    }
  });
};

exports.buyItem = (req, res) => {
  const data = req.body[0];
  const { itemId, userId } = data;

  Item.findOne({ _id: itemId }, (err, foundedItem) => {
    User.findOne({ listedItems: { $in: [foundedItem] } }, (err, foundedUser) => {
      User.findOneAndUpdate(
        { _id: foundedUser._id, 'listedItems._id': itemId },
        { $set: { 'listedItems.$.isSold': true } },
        { returnOriginal: false },
        (err, updatedUser) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  }) &&
    Item.findOneAndUpdate(
      { _id: itemId },
      { isSold: true },
      { returnOriginal: false },
      (err, updatedItem) => {
        if (!err) {
          User.findOne({ _id: userId }, (err, foundUser) => {
            if (!err) {
              User.findOneAndUpdate(
                { _id: foundUser._id },
                { boughtItems: [...foundUser.boughtItems, updatedItem] },
                { returnOriginal: false },
                (err, updatedUser) => {
                  if (!err) {
                    res.json(updatedUser);
                  } else {
                    console.log(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                  }
                }
              );
            } else {
              console.log(err);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
        } else {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    );
};
