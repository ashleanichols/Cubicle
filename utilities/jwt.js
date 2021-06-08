import { sign, verify } from 'jsonwebtoken';
const secret = 'sssecrettt';

function createToken(data) {
    return sign(data, secret);
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        verify(token, secret, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(data);
        });
    });
}

export default {
    createToken,
    verifyToken
};