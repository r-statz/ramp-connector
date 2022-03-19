const model = require("../models/index-model");

exports.testFunc = async (req, res, next) => {
  try {
    const result = await model.testFunc();
    return result;
  } catch (e) {
    if (e.errors) {
      res.status(422).json({ errors: e.errors });
    } else {
      next(e);
    }
  }
};

exports.inventoryTransferCheck = async (req, res, next) => {
  try {
  const result = await model.inventoryTransferCheck(req.body)
  return result
  } catch (e) {
    console.log(e, 'e inventoryTransferCheck ctrl');
    if (e.errors) {
      res.status(422).json({ errors: e.errors });
    } else {
      next(e);
    }
  }
};
