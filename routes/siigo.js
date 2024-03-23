const express = require("express");
const router = express.Router();

const { allProducts } = require("../controllers/siigo");
const authMiddleware = require('../middleware/auth')

router.route("/get-products").get(authMiddleware, allProducts);
// router.route("/get-orders").get(authMiddleware, orders);


module.exports = router;