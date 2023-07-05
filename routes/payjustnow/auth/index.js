const crypto = require('crypto');
const bufferEq = require('buffer-equal-constant-time');

/**
 * Validates a signature for a payload
 * @param payload // {"json":"body payload of the request"}
 * @param secret_signing_key // b9d9d345-2f99-4db9-86c7-ef52509dc29c
 * @param signature_to_validate // 60brkjy0NWMql+ljwLE5pq4c+eXbzD8C+uMyzgcoIcA=
 * @returns boolean of signature valid or not // true
 */
async function validateSignature(payload, secret_signing_key, signature_to_validate) {
  const hmac = crypto.createHmac('sha256', secret_signing_key);
   hmac.write(JSON.stringify(payload).replace(/\s/g,''));
  hmac.end();
  const sig = await hmac.read();
  return bufferEq(Buffer.from(sig.toString('base64')), Buffer.from(signature_to_validate));
}
/**
 * Create HMAC SHA-256 signature for a payload and encode it as a Base64 string
 * @param payload // The data to be signed
 * @param secretKey // The secret key for signing
 * @returns Base64 encoded signature
 */
async function createSignature(payload, secretKey) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(JSON.stringify(payload).replace(/\s/g,''));
  const signature = hmac.digest('base64'); // generate the hmac and output as base64 string
  return signature;
}


module.exports = {validateSignature , createSignature};
