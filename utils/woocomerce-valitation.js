const validarSecreto = (req, localSecret) => {
    return true;
    const signature = req.headers['x-wc-webhook-signature'];
    const body = JSON.stringify(req.body);
    const hash = crypto.createHmac('sha256', localSecret).update(body).digest('base64');

    return hash === signature;
}

const processWebHookSignature = (secret, body, signature) => {
    signatureComputed = crypto.createHmac('SHA256', secret).update(
      new Buffer.from(JSON.stringify(body), 'utf8')).digest('base64');
  
    return ( signatureComputed === signature ) ? true : false;
  }

module.exports = { validarSecreto, processWebHookSignature };
