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
    let result = [];
    const obj = req.body;
    for (let x in req.body) {
      const sku = x;
      const qty = obj[x];
      result = [...result, await model.inventoryTransferCheck(sku, qty)].flat();
    }

    return result;
  } catch (e) {
    console.log(e, "e inventoryTransferCheck ctrl");
    if (e.errors) {
      res.status(422).json({ errors: e.errors });
    } else {
      next(e);
    }
  }
};
