const model = require("../models/index-model");

exports.inventory = async (req, res, next) => {
  const result = await model.inventory();
  return result;
};

exports.inventoryTransferCheck = async (req, res, next) => {
  console.log(req.body, "rezbody");
  let arr = [];
  let skus = req.body.skus.trim();
  skus = skus.split(/\s+/);
  let qtys = req.body.qtys.trim();
  qtys = qtys.split(/\s+/);

  for (let i = 0; i < skus.length; i++) {
    let obj = {};
    obj[skus[i]] = Number(qtys[i]);
    arr.push(obj);
  }

  try {
    let result = [];
    for (let x of arr) {
      result = [
        ...result,
        await model.inventoryTransferCheck(
          Object.keys(x)[0],
          Object.values(x)[0]
        )
      ].flat();
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
