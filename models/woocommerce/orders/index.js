const api = require('./../../../config/configWoocommerce');

async function getOrders(param) {
  try {
    const statusParametros = param.split(',');
    // console.log('statusParametros:', statusParametros);
    const responseRequest = await api.get(`orders?status=${statusParametros.join(',')}`)
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
        if (error.response && error.response.data) {
          errorMessage = error.response.data.Message || 'Error desconocido';
          console.log('Mensaje de error:', errorMessage);
        } else {
          errorMessage = error;
          console.error('Error desconocido:', error);
        }
        return errorMessage;
      });
    return responseRequest;
  }
  catch (error) {
    throw new Error('Error al actualizar el stock del producto: ' + error.message);
  }
}

module.exports = {
  getOrders,
};