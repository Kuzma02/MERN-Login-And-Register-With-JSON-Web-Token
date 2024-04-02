const api = require('./../../../config/configWoocommerce');

async function getProducts() {
  try {
    // const getProducts = async (req, res) => {
    const responseRequest = await api.get("products", { per_page: 20, page: 1 })
      .then((response) => {
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
        // console.log("Response Data:", response.data);
        console.log("Total of pages:", response.headers['x-wp-totalpages']);
        console.log("Total of items:", response.headers['x-wp-total']);
        // res.status(200).json(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log("Response Status:", error.response.status);
        console.log("Response Headers:", error.response.headers);
        console.log("Response Data:", error.response.data);
        return error.response.data;
      });
    return responseRequest;
  }
  catch (error) {
    throw new Error('Error al actualizar el stock del producto: ' + error.message);
  }
}

async function findProductBySku(sku) {
  try {
    // const getProducts = async (req, res) => {
    const responseRequest = await api.get("products", { "sku" : sku})
      .then((response) => {
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
        // console.log("Response Data:", response.data);
        console.log("Total of pages:", response.headers['x-wp-totalpages']);
        console.log("Total of items:", response.headers['x-wp-total']);
        // res.status(200).json(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log("Response Status:", error.response.status);
        console.log("Response Headers:", error.response.headers);
        console.log("Response Data:", error.response.data);
        return error.response.data;
      });
    return responseRequest;
  }
  catch (error) {
    throw new Error('Error al actualizar el stock del producto: ' + error.message);
  }
}

module.exports = {
  getProducts,
  findProductBySku
};