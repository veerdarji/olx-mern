const {Router} = require("express");
const router = Router();
const items = require("../controllers/items.controller")
router.get('/get/data',items.getAllItems);
router.post('/new-item', items.createNewItem);
router.post('/buy-item', items.buyItem);

module.exports = router;