// Include CryptoJS library (make sure to include it in your project)
// You can download it from: https://cryptojs.gitbook.io/docs/
const CryptoJSUtil = require("crypto-js");

// Get the SALT from the system environment variable
let SALT = process.env.SALT! || "defaultSalt";

// Encryption function
export function encrypt(text: string) {
  const cipherText = CryptoJSUtil.AES.encrypt(text, SALT).toString();
  return cipherText;
}

// Decryption function
// export function decrypt(cipherText: string) {
//   SALT = process.env.SALT! || "defaultSalt";
//   const bytes = CryptoJSUtil.AES.decrypt(cipherText, SALT);
//   const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
//   return originalText;
// }