const apiWoocommerce = require("../config/configWoocommerce");
const { woocommerceProductFindBySku } = require("../services/woocommerceService");
const { printJson } = require("../utils/utils");


const convertProductToWoocommerce = async (product) => {
  const woocommerceProduct = {
    sku: product.code,
    type: 'simple',
    name: product.name,
    regular_price: product.prices[0].price_list[0].value,
    stock_status: (product.stock_control && product.available_quantity > 0) ? 'instock' : 'outofstock',
    manage_stock: product.stock_control,
    stock_quantity: product.stock_control ? product.available_quantity : 0,
    status: product.active ? 'publish' : 'draft',
  };
  return woocommerceProduct;
}

const sendProductToWoocommerce = async (newWoocommerceProduct) => {
  let responseRequest;
  try {
    responseRequest = await apiWoocommerce.post(`products`, newWoocommerceProduct)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Response Status:", error.response.status);
        console.log("Response Headers:", error.response.headers);
        console.log("Response Data:", error.response.data);
        return error.response.data;
      });
    console.log("### Producto creado en Woocommerce ###");
    printJson(responseRequest);
  } catch (error) {
    console.log("### Error al enviar el producto a Woocommerce ###");
    printJson(error.response);
  }
}

const processProduct = async (product) => {
  //1. hacer el log de toda la informacion del producto recibida en la bd
  console.log("### Procesando producto...###");
  printJson(product);

  //2. buscar el producto en woocommerce
  console.log("### Va a buscar producto en WooCommerce ###");
  const woocommerceProduct = await woocommerceProductFindBySku(product.resources[0].code);
  if (woocommerceProduct) {
    console.log("### Producto ya existe en WooCommerce ###");
    return;
  }

  // //3. convertir el producto a un formato que woocommerce entienda
  const newWoocommerceProduct = await convertProductToWoocommerce(product.resources[0]);
  console.log("### producto convertida a Woocommerce ###");
  printJson(newWoocommerceProduct);

  //4. enviar el producto a woocommerce
  woocommerceResponse = await sendProductToWoocommerce(newWoocommerceProduct);
}

module.exports = processProduct;
