const siigoConnect = require("../config/configSiigo");
const { siigoProductFindByCode } = require("../services/siigoService");
const { printJson } = require("../utils/utils");


const convertProductToSiigo = (product) => {
  const siigoProduct = {
    code: product.sku,
    name: product.name,
    account_group: 121, //Grupo para productos
  };
  return siigoProduct;
}

const sendProductToSiigo = async (siigoProduct) => {
  try {
    const responseRequest = await siigoConnect.post(`/products`, siigoProduct);
  } catch (error) {
    console.log("### Error al enviar el producto a siigo ###");
    printJson(error.response.data);
  }
}

const processProduct = async (product) => {
  //1. hacer el log de toda la informacion del producto recibida en la bd
  console.log("### Procesando producto...###");
  printJson(product);

  //2. buscar el producto en siigo
  const siigoProduct = await siigoProductFindByCode(product.sku);
  if (siigoProduct) {
    console.log("### Producto ya existe en Siigo ###");
    return;
  }

  //3. convertir el producto a un formato que siigo entienda
  const newSiigoProduct = convertProductToSiigo(product);
  console.log("### producto convertida a Siigo ###");
  printJson(newSiigoProduct);

  //4. enviar el producto a siigo
  siigoResponse = await sendProductToSiigo(newSiigoProduct);
}

module.exports = processProduct;
