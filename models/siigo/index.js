const siigoConnect = require('./../../config/configSiigo');

async function getProducts(param = false) {
  try {
    const responseRequest = await siigoConnect.get(`/products?code=${param}`)
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
        let errorMessage = '';
        console.log(error);
        if (error.response && error.response.data) {
          errorMessage = error.response.data.Message || 'Error desconocido';
          console.log('Mensaje de error:', errorMessage);
        } else {
          errorMessage = error;
          console.error('Error desconocido:', error);
        }
        return errorMessage;
      });
    return responseRequest
  }
  catch (error) {
    throw new Error('Error al tratar de traer los productos de siigo: ' + error.message);
  }
}

module.exports = {
  getProducts,
};