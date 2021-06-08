import { authCookieName } from '../app-config';
import { verifyToken } from './jwt';
import { findById } from '../models/user';
import { findOne } from '../models/token-blacklist';

function authorize(loginRedirect = true) {
    return function(req, res, next) {
        const token = req.cookies[authCookieName] || '';

        Promise.all([verifyToken(token), findOne({ token })]).then(([verified, isTokenBlacklisted]) => {
            if (isTokenBlacklisted) {
                return Promise.reject(new Error('the token is blacklisted'));
            }

            findById(verified.id).then(user => {
                req.user = user;
                next();
            });
        }).catch(err => {
            if (!loginRedirect) { next(); return; }

            if (['jwt must be provided', 'the token is blacklisted'].includes(err.message)) {
                res.redirect('/login');
                return;
            }

            next(err);
        });
    };
}

export default {
    authorize
};