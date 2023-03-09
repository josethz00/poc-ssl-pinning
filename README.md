# SSL Pinning with Node.js

This is a proof of concept for SSL Pinning with Node.js. It uses the https native module and express.

## 1. Generating the private key

`openssl genrsa -out ca_private_key.pem 2048`

## 2. Generating the certificate

`openssl req -x509 -new -key ca_private_key.pem -out ca_cert.pem -days 365`

## 3. Generating the CA bundle

`cat ca_cert.pem ca_private_key.pem > ca_bundle.pem`
