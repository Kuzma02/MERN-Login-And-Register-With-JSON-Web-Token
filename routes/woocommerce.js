const express = require("express");
const router = express.Router();

const { allProducts, findProduct, orders } = require("../controllers/woocommerce");
const authMiddleware = require('../middleware/auth');
const processOrder = require("../controllers/processWoocomerceCreatedOrder");
const processProduct = require("../controllers/processWoocomerceCreatedProduct");

router.route("/get-products").get(authMiddleware, allProducts);
router.route("/find-product").get(findProduct);
router.route("/get-orders").get(authMiddleware, orders);

//webhooks
router.route("/create-product-wh").post((req, res) => {
  processProduct(req.body);
  res.send("Webhook received");
});

// Se comenta debido a que no se usará webhook de Woocommerce
// router.route("/create-order-wh").post((req, res) => {
//   processOrder(req.body);
//   res.send("Webhook received");
// });


module.exports = router;
