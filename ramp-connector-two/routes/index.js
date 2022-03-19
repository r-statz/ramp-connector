const express = require("express");
const router = express.Router();
const endpoints = require("../controllers/index-ctrl");

router.get("/", async function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.get("/inventory-transfer", async function (req, res, next) {
//   const result = "tacos"
//   res.render("inventory-transfer", { result });
//   // res.json({result});
// })

router.post("/inventory-transfer", async function (req, res, next) {
  const result = await endpoints.inventoryTransferCheck(req);
  // res.render("inventory-transfer", { result });
  res.json({ result });
});

module.exports = router;
