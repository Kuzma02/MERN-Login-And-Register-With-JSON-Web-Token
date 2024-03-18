const express = require("express");
const router = express.Router();

const { allProducts, orders } = require("../controllers/woocommerce");
const authMiddleware = require('../middleware/auth')

router.route("/get-products").get(authMiddleware, allProducts);
router.route("/get-orders").get(authMiddleware, orders);


module.exports = router;