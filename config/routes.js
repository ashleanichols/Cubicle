import { index, about, pageNotFound } from '../controllers/homeController';
import { getCreate, postCreate, details, getEdit, postEdit, getDelete, postDelete } from '../controllers/cubesController';
import { getCreate as _getCreate, postCreate as _postCreate, getAttach, postAttach } from '../controllers/accessoriesController';
import { logout, getLogin, postLogin, getRegister, postRegister } from '../controllers/usersController';
import { authorize } from '../utilities/auth';

export default (app) => {
    app.get('/', index);

    app.get('/about', about);

    app.get('/create', authorize(), getCreate);
    app.post('/create', authorize(), postCreate);

    app.get('/details/:id', authorize(false), details);

    app.get('/create/accessory', _getCreate);
    app.post('/create/accessory', _postCreate);

    app.get('/logout', authorize(), logout);

    app.get('/edit/:id', authorize(), getEdit);
    app.post('/edit/:id', authorize(), postEdit);

    app.get('/delete/:id', authorize(), getDelete);
    app.post('/delete/:id', authorize(), postDelete);

    app.get('/attach/accessory/:id', authorize(), getAttach);
    app.post('/attach/accessory/:id', authorize(), postAttach);

    app.get('/login', authorize(false), getLogin);
    app.post('/login', authorize(false), postLogin);

    app.get('/register', authorize(false), getRegister);
    app.post('/register', authorize(false), postRegister);

    app.get('*', pageNotFound);
};