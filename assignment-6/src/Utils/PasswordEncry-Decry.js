import CryptoJS from "crypto-js";
const secretKey = "Dravid@1234";
//Password Encreption_Decryption
export const EncryptData = (data) => {
    const encryptext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
    return encryptext.toString();
  };

export const DecryptData = (encryptext) => {
    const text = CryptoJS.AES.decrypt(encryptext,secretKey)
    const decryptext = text.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptext)
}