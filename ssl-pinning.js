const express = require('express');
const https = require('https');
const fs = require('fs');
const tls = require('tls');

// Specify the pins in SHA256 format
const pins = ['7b3983a1f3e2710c11740e2aafd416d87dc24fb0c3e3e3ecf7c740a6168f6c06'];

const app = express();

const options = {
  key: fs.readFileSync('path/to/private/key'),
  cert: fs.readFileSync('path/to/certificate'),
  ca: fs.readFileSync('path/to/ca-bundle'),
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = https.createServer(options, app);

server.listen(3000, () => {
  console.log('Server running on port 3000');
});