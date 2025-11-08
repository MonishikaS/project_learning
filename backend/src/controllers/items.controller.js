const Item = require('../models/item.model');

async function createItem(req, res, next) {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (err) { next(err); }
}

async function listItems(req, res, next) {
  try {
    const q = {};
    if (req.query.topic) q['tags.topic'] = req.query.topic;
    const items = await Item.find(q).limit(200).lean();
    res.json(items);
  } catch (err) { next(err); }
}

async function getItem(req, res, next) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({error:'Not found'});
    res.json(item);
  } catch (err) { next(err); }
}

async function updateItem(req, res, next) {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) { next(err); }
}

async function deleteItem(req, res, next) {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
}

module.exports = { createItem, listItems, getItem, updateItem, deleteItem };
