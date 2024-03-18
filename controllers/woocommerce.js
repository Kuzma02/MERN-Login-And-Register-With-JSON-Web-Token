const jwt = require("jsonwebtoken");
// const User = require("../models/User");
const { getProducts } = require("../models/woocommerce/products");
const { getOrders } = require("../models/woocommerce/orders");


const allProducts = async (req, res) => {
  try {
    const response = await getProducts();
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const orders = async (req, res) => {
  try {
    try {
      const response = await getOrders(req.query.status);
      res.status(200).json(response);
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
    res.status(200).json('hello');
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  allProducts,
  orders
};
