const { getProducts } = require("../models/siigo");


const allProducts = async (req, res) => {
  try {
    const response = await getProducts(req.query.code);
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  allProducts
};
