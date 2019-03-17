import aesjs from "aes-js";

const key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    29, 30, 31];

export const encryptMessage = (message) => {
    let textBytes = aesjs.utils.utf8.toBytes(message);
    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(3));
    let encryptedBytes = aesCtr.encrypt(textBytes);
    return aesjs.utils.hex.fromBytes(encryptedBytes);
};

export const decryptMessage = (message) => {
    let encryptedBytes = aesjs.utils.hex.toBytes(message);
    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(3));
    let decryptedBytes = aesCtr.decrypt(encryptedBytes);
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
};