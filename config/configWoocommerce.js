require('dotenv').config(); // Para cargar las variables de entorno desde .env
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const api = new WooCommerceRestApi({
  url: "https://safarideportesyhobbies.com",
  consumerKey: process.env.API_KEY_WOOCOMMERCE,
  consumerSecret: process.env.SECRET_KEY_WOOCOMMERCE,
  version: "wc/v3"
});

module.exports = api;