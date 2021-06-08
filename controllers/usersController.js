import { findOne, create } from '../models/user';
import { create as _create } from '../models/token-blacklist';
import { createToken } from '../utilities/jwt';
import { authCookieName } from '../app-config';

function getLogin(req, res) {
    if (req.user) { res.redirect('/'); return; }

    res.render('login.hbs');
}

function postLogin(req, res, next) {
    const { username, password } = req.body;

    findOne({ username }).then(user => Promise.all([user, user.checkPassword(password)]))
        .then(([user, match]) => {
            if (!match) {
                res.render('login.hbs', { loginMsg: 'Incorrect username or password' });
                return;
            }

            const token = createToken({ id: user._id });

            res.cookie(authCookieName, token).redirect('/');
        }).catch(next);
}

function getRegister(req, res) {
    if (req.user) { res.redirect('/'); return; }

    res.render('register.hbs');
}

async function postRegister(req, res, next) {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.render('register.hbs', {
            username: username,
            errors: {
                repeatPassword: 'Password and confirmation password should match!'
            }
        });
        return;
    }

    try {
        await create({ username, password });
        res.redirect('/login');
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.render('register.hbs', {
                username: username,
                errors: {
                    username: 'Username is already taken!'
                }
            });
            return;
        }
        next(err);
    }
}

function logout(req, res) {
    const token = req.cookies[authCookieName];

    _create({ token }).then(() => {
        res.clearCookie(authCookieName).redirect('/');
    });
}

export default {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout
};