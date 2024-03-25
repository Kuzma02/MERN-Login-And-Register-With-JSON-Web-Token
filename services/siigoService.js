const siigoConnect = require("../config/configSiigo");
const { printJson } = require("../utils/utils");

const siigoProductFindByCode = async (code) => {

  let responseRequest = null;
  try {
    responseRequest = await siigoConnect.get(`/products?code=${code}`);
  } catch (error) {
    printJson(error.response.data);
    return null;
  }

  if (responseRequest.data.results.length === 0) {
    return null;
  }

  //validate product code and return the product
  const product = responseRequest.data.results.filter((product) => product.code === code);
  return product;
}


module.exports = { siigoProductFindByCode };
