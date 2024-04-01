// controllers/itemController.js
const {Item} = require('../models/items.model');
const User = require('../models/user.model');
const {ObjectId} = require('mongoose').Types;
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
      return res.status(500).json({ error: 'Internal Server Error' });
    } 
    // If there is no error saving the new item
    User.findOneAndUpdate(
      { _id: userId },
      { $push: { listedItems: newItem } }, // Add the new item to the listedItems array
      { new: true } // Return the updated user document after the update
    )
    .populate('boughtItems') // Populate the listedItems field
    .exec((err, updatedUser) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      } 
      res.json(updatedUser); // Send the updated user with populated listedItems field
    });
  });
};


exports.buyItem = async (req, res) => {
  try {
    const data = req.body[0];
    const { itemId, userId } = data;

    console.log("Attempting to update item:", itemId);

    // Update item
    const updatedItem = await Item.findOneAndUpdate(
      { _id: itemId },
      { isSold: true },
      { returnOriginal: false }
    );
    // await Item.updateOne({_id: itemId}, { $set: { isSold: true}})
    const item = await Item.findOne({_id: new ObjectId("660702222eeb1419ae7b52e8")});
console.log(item)
    if (!updatedItem) {
      console.error("Item not found:", itemId);
      return res.status(404).json({ error: 'Item not found' });
    }
    console.log("Updated item:", updatedItem);

    // Update user
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { boughtItems: updatedItem } },
      { new: true } // Returns the modified document rather than the original
    ).populate('boughtItems');
    if (!updatedUser) {
      console.error("User not found:", userId);
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("Updated user:", updatedUser);

    res.json(updatedUser);
  } catch (error) {
    console.error("Error buying item:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addtocard = async (req, res) => {
  try {
    const data = req.body[0];
    const itemId = data.itemId;
    const userId = data.userId;

    const foundItem = await Item.findOne({ _id: itemId }).exec();
    const foundUser = await User.findOne({ _id: userId }).exec();

    const updatedUser = await User.findOneAndUpdate(
      { _id: foundUser._id },
      { cartItems: [...foundUser.cartItems, foundItem] },
      { returnOriginal: false }
    ).populate('boughtItems').exec();

    res.json(updatedUser);
    console.log('done',updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.wishlist = (req, res) => {
  const data = req.body[0];
  const itemId = data.itemId;
  const userId = data.userId;

  Item.findOne({ _id: itemId }, (err, foundItem) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    User.findOne({ _id: userId, wishlist: { $in: [foundItem] } }, (err, foundUser) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (foundUser) {
        // If the item is already in the user's wishlist, remove it
        User.findOneAndUpdate(
          { _id: foundUser._id },
          { $pull: { wishlist: { _id: itemId } } },
          { returnOriginal: false },
          async (err, updatedUser) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Populate boughtItems after updating the user
            try {
              await updatedUser.populate('boughtItems');
              console.log('Removed from wishlist');
              res.send(JSON.stringify(updatedUser));
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          }
        );
      } else {
        // If the item is not in the user's wishlist, add it
        User.findOneAndUpdate(
          { _id: userId },
          { $push: { wishlist: foundItem } },
          { returnOriginal: false },
          async (err, updatedUser) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Populate boughtItems after updating the user
            try {
              await updatedUser.populate('boughtItems');
              console.log('Added to wishlist');
              res.send(JSON.stringify(updatedUser));
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          }
        );
      }
    });
  });
};
