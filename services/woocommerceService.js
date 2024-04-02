const api = require("../config/configWoocommerce");
const { printJson } = require("../utils/utils");

const woocommerceProductFindBySku = async (sku) => {

  let responseRequest = null;
  try {
    responseRequest = await api.get("products", { "sku" : sku})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Response Status:", error.response.status);
        console.log("Response Headers:", error.response.headers);
        console.log("Response Data:", error.response.data);
        return error.response.data;
      });
    printJson(responseRequest);
  } catch (error) {
    printJson(error.response !== undefined ? error.response.data : error);
    return null;
  }

  if (responseRequest.length === 0) {
    return null;
  }

  //validate product sku and return the product
  const product = responseRequest.filter((product) => product.sku === sku);
  console.log('----------')
  return product;
}


module.exports = { woocommerceProductFindBySku };
