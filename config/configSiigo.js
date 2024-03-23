const axios = require('axios');
require('dotenv').config(); // Para cargar las variables de entorno desde .env

const config = {
  baseURL: 'https://api.siigo.com',
  username: process.env.SIIGO_USERNAME,
  accessKey: process.env.SIIGO_ACCESS_KEY
};

let token = null;
let tokenExpiration = null;

const authenticate = async () => {
  try {
    const response = await axios.post(
      `${config.baseURL}/auth`,
      { username: config.username, access_key: config.accessKey }
    );
    token = response.data.access_token;
    // Suponiendo que el token dura 24 horas, establecemos una fecha de expiración
    tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    console.log('Token actualizado');
  } catch (error) {
    console.error('Error al autenticar:', error.message);
    throw error;
  }
};

const siigoConnect = axios.create({
  baseURL: config.baseURL + '/v1'
});

siigoConnect.interceptors.request.use(async (config) => {
  if (!token || tokenExpiration <= new Date()) {
    await authenticate();
  }
  config.headers = {
    'Partner-Id': 'SandboxSiigoApi'
  };
  config.headers.Authorization = `Bearer ${token}`;
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

module.exports = siigoConnect;
