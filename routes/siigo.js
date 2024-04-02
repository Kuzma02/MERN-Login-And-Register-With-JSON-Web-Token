const express = require("express");
const router = express.Router();

const { allProducts } = require("../controllers/siigo");
const authMiddleware = require('../middleware/auth')
const processProduct = require("../controllers/processSiigoCreatedProduct");

router.route("/get-products").get(authMiddleware, allProducts);
// router.route("/get-orders").get(authMiddleware, orders);

router.route("/create-product-siigo-wh").post((req, res) => {
  processProduct(req.body);
  res.send("Webhook Siigo received");
});


module.exports = router;