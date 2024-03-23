const express = require("express");
const router = express.Router();

const { allProducts, orders } = require("../controllers/woocommerce");
const authMiddleware = require('../middleware/auth');
const { validarSecreto } = require("../utils/woocomerce-valitation");

router.route("/get-products").get(authMiddleware, allProducts);
router.route("/get-orders").get(authMiddleware, orders);

//webhook
router.route("/create-product-wh").post((req, res) => {
    const localSecret = process.env.WOOCOMMERCE_WEBHOOK_SECRET;
    if(!validarSecreto(req, localSecret)) {
        console.log("Invalid secret");
        res.status(401).send("Invalid secret")
        return;
    };
    // console.log("Valid secret");
    console.log(req);
    // console.log(req.body);
    res.send("Webhook received");
});


module.exports = router;