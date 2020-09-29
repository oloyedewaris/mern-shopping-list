const express = require("express");
const router = express.Router();
const auth = require("../../middleWare/auth");

//Item Model
const Item = require("../../models/Item");

//@route get api/items
//@desc get all items
//@access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.json({ success: false }).status(404));
});

//@route post api/items
//@desc add a new api item
//@access Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => res.json({ success: false }).status(404));
});

//@route delete api/items/:id
//@desc delete an api item
//@access Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.json({ success: false }).status(404));
});

module.exports = router;
