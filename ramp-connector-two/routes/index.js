const express = require("express");
const router = express.Router();
const endpoints = require("../controllers/index-ctrl");

router.get("/", async function (req, res, next) {
  res.render("index", { title: "Express" });
  // res.render("inventory-transfer", { result: 'taco' });
});

router.get("/inventory", async function (req, res, next) {
  const result = await endpoints.inventory(req);
  res.json({ result });
});

router.post("/inventory-transfer", async function (req, res, next) {
  // if (req.body.skus.length === req.body.qtys.length) {
  const result = await endpoints.inventoryTransferCheck(req);

  console.log(result, "after model return");
  // res.json({ result });
  res.render("inventory-transfer", { result });
  // } else {
  //   res.render("error.ejs", {
  //     message: "no tacos today, guys. the numbers don't match or something.",
  //     error: "missing input data or something"
  //   });
  // }
});

module.exports = router;
