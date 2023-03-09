const express = require('express');
const https = require('https');
const fs = require('fs');
const tls = require('tls');

// Specify the pins in SHA256 format
const pins = ['7b3983a1f3e2710c11740e2aafd416d87dc24fb0c3e3e3ecf7c740a6168f6c06'];

const app = express();

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  ca: fs.readFileSync('./ca_bundle.crt'),
  // Set the minimum TLS version to 1.2
  secureProtocol: 'TLSv1.2',
  // Verify the server's certificate against the CA bundle
  checkServerIdentity: (host, cert) => {
    const certFingerprint = tls
      .createHash('sha256')
      .update(cert.raw)
      .digest('hex');
    if (pins.indexOf(certFingerprint) === -1) {
      throw new Error('Certificate pinning validation failed');
    }
    return undefined;
  },
};

app.get('/hello', (req, res) => {
  return res.send('Hello World!');
});

const server = https.createServer({
  ...options,
  secureProtocol: 'TLSv1_2_method',
}, app);

server.listen(3223, () => {
  console.log('Server running on port 3223');
});