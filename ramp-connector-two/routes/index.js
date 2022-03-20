const express = require("express");
const router = express.Router();
const endpoints = require("../controllers/index-ctrl");

router.get("/", async function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/inventory", async function (req, res, next) {
  res.render("inventory");
});

router.post("/inventory-transfer", async function (req, res, next) {
  if (req.body.qtys.length > 0 && req.body.skus.length > 0) {
    const result = await endpoints.inventoryTransferCheck(req);
    res.render("inventory-transfer", { result });
  } else {
    res.render("error.ejs", {
      message:
        "no tacos today, guys. the numbers don't match or something. go back and start over",
      error: "missing input data or something"
    });
  }
});

module.exports = router;
